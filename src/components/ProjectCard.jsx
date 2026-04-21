import { ExternalLinkIcon, GitHubIcon } from "./Icons";

function ProjectCard({ project }) {
  return (
    <article className="project-card" data-reveal>
      <div className="project-media">
        <img src={project.image} alt={`${project.title} project preview`} />
        <a
          className="project-image-link"
          href={project.image}
          target="_blank"
          rel="noreferrer"
        >
          View Screenshot
        </a>
      </div>

      <div className="project-content">
        <p className="project-label">Project</p>
        <h3>
          {project.title}
          <span>{project.subtitle}</span>
        </h3>
        <p>{project.description}</p>

        <ul className="project-bullets">
          {project.bullets?.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        <div className="chip-wrap">
          {project.tech.map((item) => (
            <span className="chip" key={item}>
              {item}
            </span>
          ))}
        </div>

        <div className="project-actions">
          <a href={project.liveUrl} target="_blank" rel="noreferrer">
            <ExternalLinkIcon />
            Live
          </a>
          <a href={project.githubUrl} target="_blank" rel="noreferrer">
            <GitHubIcon />
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
