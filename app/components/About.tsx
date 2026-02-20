import { cleanJsonStr, getDataByKey } from "@/helpers/GGSheetHelper";
import { RootState } from "@/lib/store";
import * as LucideIcons from 'lucide-react';
import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "./Modal";

const About = () => {

  const [isShowResume, setIsShowResume] = useState(false)
  const { data, loading } = useSelector((state: RootState) => state.google_sheet);

  const t = (key: string) => getDataByKey(data, 'vi', key);

  const fullname = () => {
    if (!loading) {
      const name = getDataByKey(data, 'vi', 'name')
      const pre = name.slice(0, name.lastIndexOf(' '))
      const last = name.slice(name.lastIndexOf(' ') + 1)
      return (
        <h1 className="text-5xl md:text-7xl font-extrabold uppercase leading-tight">
          {pre} <span className="text-sky-600">{last}</span>
        </h1>
      )
    }
  }

  //#region Lấy dữ liệu overview-detail và parse JSON
  let overviewDetail: any = [];

  const overviewDetailt = () => {
    if (!loading && data && data.length > 0) {
      const rawValue = getDataByKey(data, 'vi', 'overview-detail');

      if (!rawValue || rawValue === 'overview-detail') {
        console.warn("Không tìm thấy dữ liệu cho key: overview-detail");
        return [];
      }

      const cleaned = cleanJsonStr(rawValue);
      console.debug("Dữ liệu overview-detail sau khi làm sạch:", cleaned);
      try {
        overviewDetail = JSON.parse(cleaned)
      } catch (err) {
        console.error("Lỗi khi parse JSON:", err);
      }
    }
  }

  overviewDetailt();
  //#endregion

  return (
    <section id="about" className="py-10 scroll-mt-14 lg:scroll-mt-0">
      <div className="space-y-6">
        {/* Name Heading */}
        {fullname()}

        <h2 className="text-2xl font-medium text-gray-500 lowercase">
          or <span className="text-sky-600 uppercase font-bold">{getDataByKey(data, 'en', 'name')}</span>
        </h2>

        {/* Contact Info */}
        <div className="text-lg text-gray-600 space-y-2 uppercase tracking-wide">
          <p className="flex items-center">
            <LucideIcons.MapPin className="mr-3 text-sky-600" size={20} />
            <a href="#" title={`Địa chỉ: ${t('address')}`}>{t('address')}</a>
          </p>
          <p className="flex items-center">
            <LucideIcons.Phone className="mr-3 text-sky-600" size={20} />
            <a href={`tel:${t('phone')}`} className="hover:underline" title={`Số điện thoại: ${t('phone')}`}>{t('phone')}</a>
          </p>
          <p className="flex items-center text-sky-600 lowercase">
            <LucideIcons.Mail className="mr-3 text-sky-600" size={20} />
            <a href={`mailto:${t('email')}`} className="hover:underline" title={`Email: ${t('email')}`}>{t('email')}</a>
          </p>
        </div>

        {/* Overview */}
        <div className="mt-10 space-y-6">
          <h3 className="text-3xl font-bold uppercase tracking-tighter">{t('overview')}</h3>
          <div className="grid md:grid-cols-2 gap-8 text-gray-700">
            {/* <div>
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
            </div> */}
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 pt-6">
          {Array.isArray(overviewDetail)
            && overviewDetail.length > 0 &&
            overviewDetail.map((item: any, idx: number) => {
              const IconComponent = (LucideIcons as any)[item.icon] || LucideIcons.HelpCircle;
              return <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                title={item.icon}
                className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
              >
                <IconComponent className="w-6 h-6text-white" />
              </a>
            })}
          <button onClick={() => setIsShowResume(true)}
            className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
            title="Resume">
            <LucideIcons.Contact className="w-6 h-6text-white" />
          </button>
        </div>
      </div>

      <Modal
        isOpen={isShowResume}
        onClose={() => setIsShowResume(false)}
        title={`Resume - ${t('name')}`}
      >
        <div className="w-full relative overflow-hidden" style={{ paddingTop: '141.42%' }}>
          <iframe
            src={process.env.NEXT_PUBLIC_CANVA}
            className="absolute top-0 left-0 w-full h-full border-none"
            allowFullScreen
            loading="lazy"
            title="Resume"
          />
        </div>
      </Modal>

    </section>
  );
};

export default About;