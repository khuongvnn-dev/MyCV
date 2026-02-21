'use client'
import { getDataByKey } from '@/helpers/GGSheetHelper';
import { RootState } from '@/lib/store';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

const Sidebar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const { data } = useSelector((state: RootState) => state.google_sheet);
  const t = (key: string) => getDataByKey(data, 'vi', key);

  const navItems = {
    about: "h-about",
    background: "h-background",
    projects: "h-projects"
  }

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    Object.keys(navItems).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navItems]);

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    setActiveSection(id);
  }

  return (
    <nav className={clsx(
      "bg-sky-700 fixed",
      "flex flex-col items-center justify-center text-left lg:text-center z-50 p-4 lg:p-6 shadow-md lg:shadow-none",
      "lg:h-screen",
      "w-full lg:w-72"
    )}>
      {/* Brand / Profile Image (Chỉ hiện trên màn hình lớn) */}
      <Link href="#page-top" className="hidden lg:block mb-10 group">
        <div className="w-40 h-40 rounded-full border-[8px] border-sky-800 overflow-hidden mx-auto shadow-2xl transition-transform duration-300 group-hover:scale-105">
          <Image
            src={t('avatar')}
            alt={t('name')}
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
          {t('name')}
        </span>
        {/* Bạn có thể thêm nút Toggle Menu Mobile ở đây nếu cần */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 border border-sky-400 rounded-md hover:bg-sky-600 transition-colors"
          aria-label="Toggle navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Navigation Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block w-full mt-6 lg:mt-0`}>
        <ul className="flex flex-col space-y-6 mx-5 lg:mx-0">
          {Object.entries(navItems).map(([key, searchKey]) => (
            <li key={key}>
              <Link
                href={`#${key}`}
                className={clsx(
                  `text-sky-100 hover:text-white text-sm font-bold uppercase tracking-[0.15em] transition-colors duration-200 block py-2 lg:py-0 `,
                  activeSection === key
                    ? "text-white font-black scale-110"
                    : "text-sky-100 font-bold hover:text-white"
                )}
                onClick={() => handleLinkClick(key)}
              >
                {t(searchKey)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
};

export default Sidebar;