import React from 'react';

const ProjectItem = ({ title, description, members, tech, link, responsibilities, features, status }: any) => (
  <div className="mb-16">
    <div className="flex items-center mb-2">
      <h3 className="text-2xl font-bold uppercase mr-4">{title}</h3>
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 17H7q-2.075 0-3.537-1.463T2 12q0-2.075 1.463-3.537T7 7h4v2H7q-1.25 0-2.125.875T4 12q0 1.25.875 2.125T7 15h4zm-3-4v-2h8v2zm5 4v-2h4q1.25 0 2.125-.875T20 12q0-1.25-.875-2.125T17 9h-4V7h4q2.075 0 3.538 1.463T22 12q0 2.075-1.463 3.538T17 17z" />
          </svg>
        </a>
      )}
    </div>
    {status && <span className="text-sm font-semibold text-sky-600 uppercase tracking-wider">{status}</span>}
    
    <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 border-t border-gray-100 pt-4">
      <div className="font-bold text-gray-600">Description</div>
      <div className="md:col-span-3 text-gray-700">{description}</div>

      <div className="font-bold text-gray-600">Members</div>
      <div className="md:col-span-3 text-gray-700">{members}</div>

      <div className="font-bold text-gray-600">Responsibilities</div>
      <div className="md:col-span-3 text-gray-700 italic">
        <ul className="list-disc list-inside">
          {responsibilities.map((res: string, idx: number) => (
            <li key={idx}>{res}</li>
          ))}
        </ul>
      </div>

      <div className="font-bold text-gray-600">Technology</div>
      <div className="md:col-span-3 flex flex-wrap gap-2">
        {tech.map((t: string, idx: number) => (
          <span key={idx} className="bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-sm font-medium border border-sky-100">
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const Projects = () => {
  const projectsData = [
    {
      title: "Graduation Project",
      status: "Currently",
      description: "So sánh các mô hình ngôn ngữ lớn (LLMs) với mô hình Vistral-7B-Chat và ứng dụng để xây dựng ứng dụng web hỏi đáp sử dụng chatbot.",
      members: "2",
      responsibilities: ["Lập kế hoạch và quản lý dự án", "Lựa chọn phạm vi, mục tiêu và công nghệ", "Fine-tuning mô hình Vistral-7B-Chat", "So sánh các LLMs", "Viết tài liệu"],
      tech: ["Python", "RAG", "FAISS", "Chroma"],
      link: "https://github.com/users/KhuongVo2105/projects/3/views/1"
    },
    {
      title: "Instagram Clone",
      description: "Ứng dụng trò chuyện lấy cảm hứng từ tính năng nhắn tin của Instagram, xây dựng bằng Spring Boot và MySQL.",
      members: "5",
      responsibilities: ["Thiết kế và Prototyping", "Phát triển Android", "Tích hợp Backend", "Tích hợp Frontend"],
      tech: ["Java", "Spring Boot", "ReactJS", "React Native CLI", "Websocket", "Cloudinary", "Firebase"],
      link: "https://github.com/KhuongVo2105/Chat_Application.git"
    },
    {
      title: "Movie App",
      description: "Xây dựng server và client cho ứng dụng xem phim sử dụng ASP.NET 8 và MySQL.",
      members: "5",
      responsibilities: ["Thiết kế kiến trúc dự án", "Phát triển ERD và Class Diagram", "Phát triển API cho Server", "Phát triển giao diện"],
      tech: ["ASP.NET 8", "MySQL", "jQuery", "Bootstrap", "Firebase"],
      link: "https://github.com/KhuongVo2105/MovieApp"
    }
  ];

  return (
    <section id="projects" className="py-10 scroll-mt-14 lg:scroll-mt-0">
      <h2 className="text-4xl font-bold uppercase mb-12">Projects</h2>
      {projectsData.map((project, idx) => (
        <ProjectItem key={idx} {...project} />
      ))}
      <p className="text-gray-500 italic mt-10">Và các dự án khác như Harmony Chat, Flappy Bird, Blog... có thể xem thêm tại Github.</p>
    </section>
  );
};

export default Projects;