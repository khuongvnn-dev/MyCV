const Education = () => {
  return (
    <section id="education" className="py-10">
      <h2 className="text-4xl font-bold uppercase mb-10">Education</h2>
      
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold uppercase">Nong Lam University</h3>
          <div className="text-xl font-medium text-gray-600">
            Sinh viên năm <b>4</b> chuyên ngành Công nghệ thông tin (tính đến 2025)
          </div>
          <p className="text-gray-500 italic">Chương trình đại học 4 năm tập trung vào lập trình Java</p>
        </div>
        <div className="mt-2 md:mt-0">
          <span className="text-indigo-600 font-bold text-lg">2021 - Dự kiến 2025</span>
        </div>
      </div>
    </section>
  );
};

export default Education;