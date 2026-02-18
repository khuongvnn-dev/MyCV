const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      items: ["Java", "JavaScript", "Kotlin", "Python"]
    },
    {
      title: "Frameworks & Libraries",
      items: ["Spring Boot", "React", "Docker", "Hugging Face", "jQuery", "Tailwind", "Bootstrap", "JavaFX"]
    },
    {
      title: "Database Management Systems",
      items: ["PostgreSQL", "MySQL", "SQL Server", "MongoDB", "Redis", "Chroma"]
    },
    {
      title: "Other Tools & Tech",
      items: ["Git", "Unix", "Atlas", "Docker", "Maven", "Figma"]
    }
  ];

  return (
    <section id="skills" className="py-10">
      <h2 className="text-4xl font-bold uppercase mb-10">Skills</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {skillCategories.map((cat, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className="text-xl font-bold uppercase tracking-wide text-gray-600 border-b-2 border-indigo-100 pb-2">
              {cat.title}
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-gray-700">
              {cat.items.map((skill, sIdx) => (
                <li key={sIdx} className="flex items-center capitalize">
                  <span className="mr-2 text-indigo-500 text-xs">●</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-bold uppercase text-gray-600 mb-2">English</h3>
        <p className="text-gray-700 flex items-center">
          <span className="mr-2 text-indigo-500">●</span> Basic communication
        </p>
      </div>
    </section>
  );
};

export default Skills;