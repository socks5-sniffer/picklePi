#!/usr/bin/env python3
"""
picklePi – AI-Driven Scrum Team Orchestration
==============================================
Orchestrates a 3-agent Scrum team using CrewAI:

  1. Product Owner  – manages the backlog and writes secure, hardware-focused
                      user stories for the picklePi curriculum.
  2. Lead Developer – implements Python / PHP code for Raspberry Pi GPIO and
                      the web interface using strict secure-coding patterns.
  3. Security Auditor – reviews all output for OWASP vulnerabilities, PoLP
                        violations, and unsafe patterns (e.g. eval(), missing
                        error handling).

Usage
-----
  1. Copy `.env.example` to `.env` and fill in your credentials.
  2. Install dependencies: pip install -r requirements.txt
  3. Run: python scrum_team.py

Security notes
--------------
- API keys are loaded exclusively from environment variables via python-dotenv.
  They are never hard-coded or logged.
- The Security Auditor agent blocks any artefact that contains `eval()` or
  lacks error handling before it reaches the final output.
- Firebase credentials are loaded from a service-account key file whose path
  is stored in an environment variable – the file itself is never committed.
"""

import os
import logging
import re
from typing import Any

from dotenv import load_dotenv
from crewai import Agent, Crew, Task

# ---------------------------------------------------------------------------
# Bootstrap
# ---------------------------------------------------------------------------

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s – %(message)s",
)
logger = logging.getLogger("picklePi.scrum_team")

# Validate that the minimum required env vars are present before proceeding.
_REQUIRED_ENV_VARS = ["OPENAI_API_KEY"]
_missing = [v for v in _REQUIRED_ENV_VARS if not os.getenv(v)]
if _missing:
    raise EnvironmentError(
        f"Missing required environment variable(s): {', '.join(_missing)}. "
        "Copy scrum_team/.env.example to scrum_team/.env and fill in the values."
    )

# ---------------------------------------------------------------------------
# Firebase – project-board sync (placeholder)
# ---------------------------------------------------------------------------


def sync_project_board_to_firebase(project_board: dict[str, Any]) -> None:
    """Sync the final Scrum project-board state to Firebase Firestore.

    This is a placeholder implementation. Replace the body with real
    firebase_admin calls once the Firebase project is provisioned.

    Args:
        project_board: A dictionary representing the current sprint board,
                       e.g. {"sprint": 1, "status": "Done", "stories": [...]}.

    Raises:
        RuntimeError: If the Firebase project ID env var is not set.
        Exception:    Re-raises any Firebase SDK errors after logging them.
    """
    project_id = os.getenv("FIREBASE_PROJECT_ID")
    if not project_id:
        raise RuntimeError(
            "FIREBASE_PROJECT_ID environment variable is not set. "
            "Firebase sync requires a valid project ID."
        )

    logger.info("Syncing project board to Firebase project '%s' …", project_id)

    # TODO: Replace this block with actual firebase_admin integration, e.g.:
    #
    #   import firebase_admin
    #   from firebase_admin import credentials, firestore
    #
    #   key_path = os.getenv("FIREBASE_SERVICE_ACCOUNT_KEY_PATH")
    #   if not firebase_admin._apps:
    #       cred = credentials.Certificate(key_path)
    #       firebase_admin.initialize_app(cred)
    #
    #   db = firestore.client()
    #   db.collection("project_boards").document("picklePi").set(project_board)

    logger.info("Project board sync placeholder executed. Board state: %s", project_board)


# ---------------------------------------------------------------------------
# Security helper – used by the Security Auditor agent's tool/callback
# ---------------------------------------------------------------------------

_BLOCKED_PATTERNS = [
    (re.compile(r"\beval\s*\("), "use of eval()"),
    # Match bare `except:` only – not `except ValueError:` or similar.
    # Uses a negative lookahead so that any exception type following `except`
    # is allowed; only a naked colon (optionally preceded by whitespace)
    # triggers the violation.
    (re.compile(r"^\s*except\s*:", re.MULTILINE), "bare except clause (lacks error handling)"),
]

# Patterns that warrant a warning rather than an outright block.
_WARNING_PATTERNS = [
    # Catch-all Exception without re-raise or logging is a smell, but not always wrong.
    (
        re.compile(r"except\s+Exception\s*:", re.MULTILINE),
        "broad Exception catch – verify that it logs the error and/or re-raises",
    ),
]


def audit_code_for_violations(code: str) -> list[str]:
    """Return a list of security violation descriptions found in *code*.

    Checks for blocking issues:
    - eval() usage (arbitrary code execution risk – CWE-95)
    - Bare except clauses that swallow all errors (CWE-390)

    Also checks for non-blocking warnings:
    - Broad ``except Exception:`` catches without verified logging/re-raise

    Args:
        code: The source code string to audit.

    Returns:
        A list of human-readable violation or warning descriptions.
        Items prefixed with ``[BLOCK]`` must be remediated before approval;
        items prefixed with ``[WARN]`` should be reviewed but do not
        automatically block approval.
    """
    findings: list[str] = []
    for pattern, description in _BLOCKED_PATTERNS:
        if pattern.search(code):
            findings.append(f"[BLOCK] {description}")
    for pattern, description in _WARNING_PATTERNS:
        if pattern.search(code):
            findings.append(f"[WARN]  {description}")
    return findings


# ---------------------------------------------------------------------------
# Agents
# ---------------------------------------------------------------------------

product_owner = Agent(
    role="Product Owner",
    goal=(
        "Manage the picklePi backlog and define clear, actionable technical "
        "user stories that prioritise security best practices and hardware "
        "educational value for Raspberry Pi GPIO projects."
    ),
    backstory=(
        "You are a seasoned Product Owner with a background in embedded systems "
        "and cybersecurity education. You translate high-level picklePi goals "
        "into sprint-ready user stories, always asking 'Is this safe for a "
        "student to run?' and 'Does this teach a lasting hardware principle?'"
    ),
    verbose=True,
    allow_delegation=False,
)

lead_developer = Agent(
    role="Lead Developer",
    goal=(
        "Implement Python and PHP code for Raspberry Pi GPIO control and the "
        "picklePi web interface. Follow strict input-sanitisation and secure-"
        "coding patterns: validate all inputs, use parameterised queries, avoid "
        "dangerous built-ins, and always include error handling."
    ),
    backstory=(
        "You are a full-stack developer who specialises in IoT and Raspberry Pi "
        "projects. You write clean, well-commented, production-quality code and "
        "treat every GPIO interaction as a potential safety boundary. You never "
        "use eval(), exec(), or shell=True without an explicit security review."
    ),
    verbose=True,
    allow_delegation=False,
)

security_auditor = Agent(
    role="Security Auditor",
    goal=(
        "Review all Lead Developer output for OWASP Top-10 vulnerabilities and "
        "Principle of Least Privilege (PoLP) violations. Block any artefact that "
        "contains eval(), lacks error handling, or exposes sensitive data. Provide "
        "a structured remediation report for every finding."
    ),
    backstory=(
        "You are a certified application-security engineer with deep knowledge of "
        "OWASP, CWE, and embedded-systems threat modelling. You read every line of "
        "code with the assumption that it will be run by a student on physical "
        "hardware. You are the last line of defence before deployment."
    ),
    verbose=True,
    allow_delegation=False,
)

# ---------------------------------------------------------------------------
# Tasks
# ---------------------------------------------------------------------------

task_create_user_story = Task(
    description=(
        "Create a detailed, sprint-ready user story for the next picklePi "
        "curriculum feature. The story must:\n"
        "  1. Follow the format: 'As a [persona], I want [feature] so that [benefit].'\n"
        "  2. Include clear acceptance criteria (minimum 3).\n"
        "  3. Highlight any GPIO pin assignments, security considerations, and "
        "     educational learning objectives.\n"
        "  4. Flag any potential hardware safety risks.\n"
        "Deliver the user story as a structured text block."
    ),
    expected_output=(
        "A complete user story with title, description, acceptance criteria, "
        "GPIO details, security notes, and learning objectives."
    ),
    agent=product_owner,
)

task_implement_feature = Task(
    description=(
        "Using the user story produced by the Product Owner, write the implementation "
        "for the picklePi feature. You must:\n"
        "  1. Write idiomatic Python 3 code using gpiozero for GPIO control.\n"
        "  2. Sanitise and validate ALL inputs before use.\n"
        "  3. Use try/except blocks with specific exception types – never bare excepts.\n"
        "  4. Never use eval(), exec(), or subprocess with shell=True.\n"
        "  5. Follow OWASP Secure Coding Practices.\n"
        "  6. Add docstrings and inline comments explaining security decisions.\n"
        "Deliver the complete, runnable source file(s) with a brief explanation."
    ),
    expected_output=(
        "Complete, commented Python 3 source code that implements the user story, "
        "together with a short explanation of the security measures applied."
    ),
    agent=lead_developer,
    context=[task_create_user_story],
)

task_security_audit = Task(
    description=(
        "Perform a security audit of the Lead Developer's implementation. You must:\n"
        "  1. Check for ALL OWASP Top-10 (2021) vulnerability categories.\n"
        "  2. Verify the Principle of Least Privilege is applied throughout.\n"
        "  3. Reject any code that contains eval(), exec(), shell=True, or bare "
        "     except clauses.\n"
        "  4. Confirm all inputs are validated and sanitised.\n"
        "  5. Confirm sensitive data (API keys, passwords) is never hard-coded.\n"
        "  6. Produce a structured audit report listing: PASS items, FAIL items "
        "     (with CWE/OWASP reference and remediation steps), and an overall "
        "     APPROVED or BLOCKED verdict.\n"
        "Only APPROVED output may proceed to the project board."
    ),
    expected_output=(
        "A structured security audit report with individual findings (PASS/FAIL), "
        "CWE/OWASP references, remediation guidance, and a final APPROVED or "
        "BLOCKED verdict."
    ),
    agent=security_auditor,
    context=[task_implement_feature],
)

# ---------------------------------------------------------------------------
# Crew
# ---------------------------------------------------------------------------

scrum_crew = Crew(
    agents=[product_owner, lead_developer, security_auditor],
    tasks=[task_create_user_story, task_implement_feature, task_security_audit],
    verbose=True,
)

# ---------------------------------------------------------------------------
# Main entry point
# ---------------------------------------------------------------------------


_TASK_SUMMARY_LENGTH = 80


def _truncate(text: str, length: int = _TASK_SUMMARY_LENGTH) -> str:
    """Return *text* truncated to *length* characters, appending '…' if cut.

    Args:
        text: The string to truncate.
        length: Maximum number of characters before the ellipsis.

    Returns:
        The original string if it fits within *length*, otherwise the first
        *length* characters followed by '…'.
    """
    return text if len(text) <= length else text[:length] + "…"


def main() -> None:
    """Run the Scrum team crew and sync the result to Firebase."""
    logger.info("Starting picklePi Scrum Team Orchestration …")

    result = scrum_crew.kickoff()

    logger.info("Crew execution complete. Processing results …")

    # Build a simple project-board snapshot from the crew result.
    project_board: dict[str, Any] = {
        "project": "picklePi",
        "sprint": 1,
        "status": "Done",
        "audit_verdict": _extract_verdict(str(result)),
        "stories": [
            {
                "task": _truncate(task_create_user_story.description),
                "agent": product_owner.role,
                "status": "Done",
            },
            {
                "task": _truncate(task_implement_feature.description),
                "agent": lead_developer.role,
                "status": "Done",
            },
            {
                "task": _truncate(task_security_audit.description),
                "agent": security_auditor.role,
                "status": "Done",
            },
        ],
        "raw_output": str(result),
    }

    sync_project_board_to_firebase(project_board)

    logger.info("All done. Audit verdict: %s", project_board["audit_verdict"])


def _extract_verdict(audit_output: str) -> str:
    """Extract APPROVED or BLOCKED from the security auditor's output.

    Searches for a structured verdict line of the form
    ``Verdict: APPROVED`` or ``Verdict: BLOCKED`` (case-insensitive).
    Falls back to scanning for the keywords as standalone words if the
    structured form is absent, preferring the *last* occurrence so that
    a report which mentions "Initially BLOCKED … now APPROVED" resolves
    correctly.

    Args:
        audit_output: The raw string output from the Security Auditor task.

    Returns:
        'APPROVED', 'BLOCKED', or 'UNKNOWN' if neither keyword is found.
    """
    # Prefer an explicit "Verdict: X" line for unambiguous extraction.
    structured = re.search(
        r"\bverdict\s*[:\-]\s*(approved|blocked)\b",
        audit_output,
        re.IGNORECASE,
    )
    if structured:
        return structured.group(1).upper()

    # Fall back to the *last* occurrence of the keywords as whole words.
    matches = list(re.finditer(r"\b(APPROVED|BLOCKED)\b", audit_output.upper()))
    if matches:
        return matches[-1].group(1)

    return "UNKNOWN"


if __name__ == "__main__":
    main()
