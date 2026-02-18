import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-10">
      <div className="space-y-6">
        {/* Name Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold uppercase leading-tight">
          Võ Nguyễn Nhật <span className="text-indigo-600">Khương</span>
        </h1>
        
        <h2 className="text-2xl font-medium text-gray-500 lowercase">
          or <span className="text-indigo-600 uppercase font-bold">Kieran</span>
        </h2>

        {/* Contact Info */}
        <div className="text-lg text-gray-600 space-y-2 uppercase tracking-wide">
          <p className="flex items-center">
            <span className="mr-3 text-indigo-600"><i className="fas fa-map-marker-alt"></i></span>
            Tan Lap 1 Street, District 9, Thu Duc City, Vietnam
          </p>
          <p className="flex items-center">
            <span className="mr-3 text-indigo-600"><i className="fas fa-phone-alt"></i></span>
            (+84) 915-870-683
          </p>
          <p className="flex items-center text-indigo-600 lowercase">
            <span className="mr-3 text-indigo-600"><i className="fas fa-envelope"></i></span>
            <a href="mailto:vnnkhuong@gmail.com" className="hover:underline">vnnkhuong@gmail.com</a>
          </p>
        </div>

        {/* Overview */}
        <div className="mt-10 space-y-6">
          <h3 className="text-3xl font-bold uppercase tracking-tighter">Overview</h3>
          <div className="grid md:grid-cols-2 gap-8 text-gray-700">
            <div>
              <h4 className="font-bold text-xl mb-3">Programming Skills</h4>
              <ul className="list-disc list-inside space-y-1">
                <li><b>3+ years</b> kinh nghiệm làm việc với <b>Java</b></li>
                <li>Kinh nghiệm làm việc với <b>Unix</b> (Ubuntu/Debian)</li>
                <li>Kỹ năng giao tiếp và học hỏi tốt</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-3">Technical Skills</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Thành thạo Java core, Cấu trúc dữ liệu</li>
                <li>Phát triển Web: HTML, CSS, JS, Tailwind, Bootstrap</li>
                <li>Frameworks: Spring Boot, React Native, jQuery</li>
                <li>Công nghệ: Docker, Machine Learning (training & deploying)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 pt-6">
          {[
            { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/in/khuongvo-is-me/' },
            { icon: 'fab fa-github', href: 'https://github.com/KhuongVo2105' },
            { icon: 'far fa-id-card', href: 'https://khuongvo2105.github.io/MyCV/' },
            { icon: 'fas fa-id-card-alt', href: '#' },
          ].map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors"
            >
              <i className={social.icon}></i>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;