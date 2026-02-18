import Image from 'next/image';
import Link from 'next/link';

const Sidebar = () => {
  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'More', href: '#more' },
  ];

  return (
    <nav className="bg-indigo-700 lg:fixed lg:h-screen lg:w-72 flex flex-col items-center justify-center p-6 text-center z-50">
      {/* Brand / Profile Image (Chỉ hiện trên màn hình lớn) */}
      <Link href="#page-top" className="hidden lg:block mb-10 group">
        <div className="w-40 h-40 rounded-full border-[8px] border-indigo-800 overflow-hidden mx-auto shadow-2xl transition-transform duration-300 group-hover:scale-105">
          <Image
            src="/assets/img/IMG_20240220_164308.jpg"
            alt="Võ Nguyễn Nhật Khương"
            width={160}
            height={160}
            className="object-cover w-full h-full"
            priority
            unoptimized 
          />
        </div>
      </Link>

      {/* Tên hiển thị trên Mobile */}
      <div className="lg:hidden w-full flex justify-between items-center text-white">
        <span className="text-xl font-bold uppercase tracking-wider">
          Võ Nguyễn Nhật Khương
        </span>
        {/* Bạn có thể thêm nút Toggle Menu Mobile ở đây nếu cần */}
      </div>

      {/* Navigation Menu */}
      <div className="hidden lg:block w-full">
        <ul className="flex flex-col space-y-6">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link 
                href={item.href}
                className="text-indigo-100 hover:text-white text-sm font-bold uppercase tracking-[0.15em] transition-colors duration-200 block"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;