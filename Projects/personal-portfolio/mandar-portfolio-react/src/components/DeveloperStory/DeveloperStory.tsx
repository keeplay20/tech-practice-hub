import {
  FaTools,
  FaLaptopCode,
  FaReact,
  FaBriefcase,
  FaCode,
} from "react-icons/fa";
import styles from "../../styles/DeveloperStory.module.css";

const storySteps = [
  {
    year: "2014",
    title: "Started as a SharePoint Consultant",
    description:
      "Worked at Wipro configuring SharePoint and supporting users in EMEA & APAC regions.",
    icon: <FaTools />,
  },
  {
    year: "2016",
    title: "Moved to Software Testing",
    description:
      "Manual and automation testing on Linux-based OS and web portals at VXL.",
    icon: <FaLaptopCode />,
  },
  {
    year: "2019",
    title: "SDET at Gupshup",
    description:
      "Automated backend components, did performance testing, and built test data generators.",
    icon: <FaReact />,
  },
  {
    year: "2021",
    title: "SDET 2 at Dream11",
    description:
      "Built mock payment framework, reduced regression time, and led automation strategy.",
    icon: <FaBriefcase />,
  },
  {
    year: "2023+",
    title: "Transitioned to SDE Role",
    description:
      "Building React Native apps, mastering frontend tech, and creating stunning UIs.",
    icon: <FaCode />,
  },
];

interface DeveloperStoryProps {
  role: "SDET" | "SDE";
}

export default function DeveloperStory({ role }: DeveloperStoryProps) {
  return (
    <section className={styles.story}>
      <h2 className={styles.heading}>My Developer Journey</h2>
      <div className={styles.timeline}>
        {storySteps.map((step, index) => {
          const isActive =
            (role === "SDET" && index < 4) || (role === "SDE" && index >= 4);

          const isLastStep = index === storySteps.length - 1;

          return (
            <div
              key={index}
              className={`${styles.step} ${
                isActive ? styles.active : styles.inactive
              } ${isLastStep ? "last" : ""}`}
            >
              <div className={`${styles.dot} ${isLastStep ? styles.glow : ""}`}>
                {step.icon}
              </div>
              <div className={styles.content}>
                <h3>
                  {step.year} — {step.title}
                </h3>
                <p>{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
