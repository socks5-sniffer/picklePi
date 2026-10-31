import { useRef, useState } from "react";
import {
  ArrowRight,
  BookOpenText,
  Check,
  CheckCircle2,
  CircuitBoard,
  Clock3,
  Cpu,
  Lightbulb,
  Search,
  Sparkles,
  Sprout,
  Trophy,
  Waves,
  Zap,
} from "lucide-react";
import { curriculum } from "../data/curriculum";
import type { Project, UserProgress } from "../types";
import type { AppTab } from "../lib/navigation";
import {
  filterProjects,
  getNextProject,
  getProjectStage,
  projectStages,
  type ProjectStage,
} from "../lib/projectCatalog";

interface LandingViewProps {
  progress: UserProgress;
  onSelectProject: (id: string) => void;
  onNavigate: (tab: AppTab) => void;
}

const summaries = [
  "Mix red, green, and blue light. Meet the tiny outputs that bring a circuit to life.",
  "Make something happen with a press. Let a button tell your code what to do.",
  "Go beyond on and off. Use pulses to make an LED gently brighten and fade.",
  "Give your circuit a voice. Turn frequencies into musical notes with a buzzer.",
  "Help your Pi notice movement. Make a circuit react to the world around it.",
  "Discover which way is up. Read motion and tilt with a three-axis sensor.",
  "Bring your skills together. Build an alarm that listens to several sensors.",
  "Turn a dial into data. Explore analog signals and control an LED’s brightness.",
  "Measure without touching. Use sound to sense how far away an object is.",
  "Connect sensing and control. Build a system that responds to temperature.",
  "Explore light as an input. Detect when something interrupts a beam.",
  "Sense a door opening. Learn how magnets and switches work together.",
  "Notice a bump or shake. Combine motion readings into a monitoring project.",
];

/** An illustration of the learning process, rather than a wiring diagram. */
function WorkshopIllustration() {
  return (
    <div className="workshop-illustration" aria-hidden="true">
      <div className="illustration-orbit orbit-one" />
      <div className="illustration-orbit orbit-two" />
      <span className="diagram-label label-idea">
        <Lightbulb size={14} /> A little idea
      </span>
      <svg viewBox="0 0 400 310" className="circuit-illustration" fill="none">
        <path
          d="M68 110H107V160H162M304 114H342V221H276"
          stroke="#9fb179"
          strokeWidth="3"
          strokeDasharray="6 5"
        />
        <g transform="rotate(-9 205 174)">
          <rect
            x="112"
            y="89"
            width="191"
            height="157"
            rx="18"
            fill="#183d2c"
            stroke="#77a77a"
            strokeWidth="2"
          />
          <rect x="129" y="106" width="137" height="17" rx="4" fill="#15261d" />
          {Array.from({ length: 16 }, (_, i) => (
            <rect
              key={i}
              x={135 + i * 8}
              y="110"
              width="3"
              height="9"
              rx="1"
              fill="#cebc75"
            />
          ))}
          <path
            d="M151 149H178V180H206M240 199H267V150M164 222V201H188"
            stroke="#4e7854"
            strokeWidth="2"
          />
          <rect
            x="185"
            y="143"
            width="53"
            height="55"
            rx="5"
            fill="#12231b"
            stroke="#729575"
          />
          <CircuitBoard
            x="199"
            y="157"
            width="25"
            height="25"
            stroke="#a7d68b"
            strokeWidth="1.5"
          />
          <rect x="285" y="138" width="29" height="29" rx="3" fill="#abb5aa" />
          <rect x="285" y="177" width="29" height="43" rx="3" fill="#abb5aa" />
          <rect x="155" y="237" width="41" height="16" rx="3" fill="#b5bda8" />
          <circle cx="128" cy="231" r="4" fill="#182b20" stroke="#98b17b" />
          <circle cx="285" cy="105" r="4" fill="#182b20" stroke="#98b17b" />
          <circle
            cx="140"
            cy="210"
            r="4"
            fill="#d5f89a"
            className="board-light"
          />
        </g>
        <path
          d="M78 82V105M68 82V113H103V151H132"
          stroke="#d9b666"
          strokeWidth="3"
        />
        <path
          d="M58 65C58 43 88 43 88 65V82H58V65Z"
          fill="#d7f58e"
          stroke="#eefdc0"
          strokeWidth="2"
        />
        <ellipse cx="73" cy="63" rx="27" ry="28" fill="#d7f58e" opacity=".10" />
        <path
          d="M73 32V23M46 41L39 35M100 41L107 35"
          stroke="#d7f58e"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="335" cy="67" r="6" fill="#d8a38e" />
        <path
          d="M41 208H54M47.5 201.5V214.5"
          stroke="#a0c495"
          strokeWidth="2"
        />
      </svg>
      <div className="mini-code">
        <span>
          <i /> hello_world.py
        </span>
        <code>
          <b>led</b>.blink()<em># look what you made.</em>
        </code>
      </div>
      <span className="diagram-label label-made">
        <CheckCircle2 size={14} /> Made by you
      </span>
    </div>
  );
}

function ProjectCard({
  project,
  status,
  recommended,
  onSelect,
}: {
  project: Project;
  status: string;
  recommended: boolean;
  onSelect: () => void;
}) {
  const ProjectIcon =
    project.level <= 3 ? Lightbulb : project.level <= 7 ? Waves : CircuitBoard;
  return (
    <article
      className={`project-card ${recommended ? "project-recommended" : ""}`}
    >
      <div
        className={`project-art project-art-${(project.level - 1) % 3}`}
        aria-hidden="true"
      >
        <span className="project-art-grid" />
        <ProjectIcon size={64} strokeWidth={1.15} />
        <span className="art-level">
          PROJECT {String(project.level).padStart(2, "0")}
        </span>
        <span className="art-status">
          {status === "Completed" ? (
            <>
              <Check size={12} /> Completed
            </>
          ) : recommended ? (
            <>
              <Sparkles size={12} /> Up next for you
            </>
          ) : (
            getProjectStage(project.level)
          )}
        </span>
      </div>
      <div className="project-card-body">
        <div className="project-meta">
          <span>LEVEL {String(project.level).padStart(2, "0")}</span>
          <span>
            <Clock3 size={12} />{" "}
            {project.content?.overview.estimatedTime || "At your pace"}
          </span>
        </div>
        <h3>{project.title}</h3>
        <p>
          {summaries[project.level - 1] ??
            project.content?.overview.description}
        </p>
        <div className="project-skills">
          {project.skillsLearned.slice(0, 2).map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
        <button
          className="project-link"
          onClick={onSelect}
          aria-label={`${status === "Completed" ? "Review" : status === "In Progress" ? "Continue" : "Start"} ${project.title}`}
        >
          {status === "Completed"
            ? "Revisit project"
            : status === "In Progress"
              ? "Keep building"
              : "Let’s build this"}
          <ArrowRight size={17} />
        </button>
      </div>
    </article>
  );
}

export default function LandingView({
  progress,
  onSelectProject,
  onNavigate,
}: LandingViewProps) {
  const [stage, setStage] = useState<ProjectStage>("All projects");
  const [search, setSearch] = useState("");
  const catalogRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const completed = curriculum.filter(
    (project) => progress.projectStatuses[project.id] === "Completed",
  ).length;
  const nextProject = getNextProject(curriculum, progress.projectStatuses);
  const projects = filterProjects(curriculum, stage, search);

  function exploreProjects() {
    catalogRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
    searchRef.current?.focus({ preventScroll: true });
  }

  return (
    <div className="home-view">
      <header className="home-heading">
        <div>
          <p className="eyebrow">
            <span /> A SPACE FOR CURIOUS MINDS
          </p>
          <h1>Welcome to your workshop.</h1>
          <p>
            For first-time makers, lifelong tinkerers, and everyone in between.
          </p>
        </div>
        <div className="home-progress">
          <span className="progress-medallion">
            <Trophy size={20} />
          </span>
          <div>
            <strong>
              {completed} <span>/ {curriculum.length}</span>
            </strong>
            <p>projects completed</p>
          </div>
        </div>
      </header>

      <section className="workshop-hero" aria-labelledby="workshop-title">
        <div className="hero-copy">
          <span className="hero-kicker">
            <Zap size={13} /> BIG IDEAS START SMALL
          </span>
          <h2 id="workshop-title">
            Small circuits.
            <br />
            <span>Big discoveries.</span>
          </h2>
          <p>
            Bring your ideas to life with Raspberry Pi.
            <br className="hidden sm:block" /> Build a circuit, write a little
            Python, and see what happens.
          </p>
          <div className="hero-actions">
            <button
              className="button-primary"
              onClick={() => onSelectProject((nextProject ?? curriculum[0]).id)}
            >
              {!nextProject
                ? "Revisit your first build"
                : progress.projectStatuses[nextProject.id] === "In Progress"
                  ? "Continue your build"
                  : "Start making"}
              <ArrowRight size={17} />
            </button>
            <button className="button-text" onClick={exploreProjects}>
              Explore projects
              <ChevronArrow />
            </button>
          </div>
          <div className="hero-reassurance">
            <span>
              <Check size={13} /> No experience needed
            </span>
            <span>
              <Check size={13} /> Go at your own pace
            </span>
          </div>
        </div>
        <WorkshopIllustration />
      </section>

      <section className="learning-strip" aria-label="How learning works">
        {[
          {
            icon: Lightbulb,
            title: "Understand the idea",
            text: "Plain words. Helpful examples.",
          },
          {
            icon: Cpu,
            title: "Make it real",
            text: "Guided wiring and runnable code.",
          },
          {
            icon: Sprout,
            title: "Make it your own",
            text: "Experiment, reflect, and grow.",
          },
        ].map(({ icon: Icon, title, text }, index) => (
          <div key={title}>
            <span className="learning-strip-icon">
              <Icon size={20} />
            </span>
            <div>
              <h3>
                <span>0{index + 1}</span> {title}
              </h3>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </section>

      <section
        ref={catalogRef}
        className="project-catalog"
        aria-labelledby="projects-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">A LITTLE PRACTICE. A LOT OF POSSIBILITY.</p>
            <h2 id="projects-title">Find your next spark.</h2>
          </div>
          <span className="catalog-note">
            {curriculum.length} projects · all open to explore
          </span>
        </div>
        <div className="catalog-controls">
          <div
            className="stage-filters"
            role="group"
            aria-label="Filter projects by learning stage"
          >
            {projectStages.map((item) => (
              <button
                key={item}
                aria-pressed={stage === item}
                onClick={() => setStage(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="project-search">
            <Search size={16} />
            <input
              ref={searchRef}
              aria-label="Search projects"
              type="search"
              placeholder="Find a project…"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>
        <p className="sr-only" role="status">
          {projects.length} projects found
        </p>
        {projects.length > 0 ? (
          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                status={progress.projectStatuses[project.id]}
                recommended={project.id === nextProject?.id}
                onSelect={() => onSelectProject(project.id)}
              />
            ))}
          </div>
        ) : (
          <div className="catalog-empty">
            <Search size={30} />
            <h3>No sparks here just yet.</h3>
            <p>Try a different word or learning stage.</p>
            <button
              className="button-secondary"
              onClick={() => {
                setSearch("");
                setStage("All projects");
              }}
            >
              Show all projects
            </button>
          </div>
        )}
      </section>

      <section className="workshop-toolbox" aria-label="Helpful workshop tools">
        <div>
          <BookOpenText size={23} />
          <h2>A helping hand, whenever you need it.</h2>
          <p>New word? Unfamiliar pin? Keep these tools close by.</p>
        </div>
        <button onClick={() => onNavigate("dictionary")}>
          Open the dictionary
          <ArrowRight size={17} />
        </button>
        <button onClick={() => onNavigate("pinout")}>
          Explore GPIO pins
          <ArrowRight size={17} />
        </button>
      </section>
      <footer className="home-footer">
        <span>
          <CircuitBoard size={16} /> picklePi
        </span>
        <p>Learn by making. Keep being curious.</p>
        <span>Built for every kind of learner.</span>
      </footer>
    </div>
  );
}

function ChevronArrow() {
  return <ArrowRight size={15} />;
}
