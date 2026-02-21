import { cleanJsonStr, getDataByKey } from "@/helpers/GGSheetHelper";
import { RootState } from "@/lib/store";
import * as LucideIcons from 'lucide-react';
import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import Markdown from "react-markdown";

const About = () => {

  const [isShowResume, setIsShowResume] = useState(false)
  const { data, loading, language } = useSelector((state: RootState) => state.google_sheet);

  const t = (key: string) => getDataByKey(data, language, key);

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

  //#region Lấy dữ liệu o-social và parse JSON
  let overviewSocials: any = [];

  const overviewSocial = () => {
    if (!loading && data && data.length > 0) {
      const rawValue = t('o-social');

      if (!rawValue || rawValue === 'o-social') {
        console.warn("Không tìm thấy dữ liệu cho key: o-social");
        return [];
      }

      const cleaned = cleanJsonStr(rawValue);
      try {
        overviewSocials = JSON.parse(cleaned)
      } catch (err) {
        console.error("Lỗi khi parse JSON:", err);
      }
    }
  }

  overviewSocial();
  //#endregion

  const overviewDetail = () => {
  if (!loading) {
    const rawValue = t('o-detail');
    if (!rawValue || rawValue === 'o-detail') return "";

    try {
      // cleanJsonStr sẽ dọn dẹp các dấu ngoặc kép dư của CSV, 
      // sau đó JSON.parse sẽ biến \\n thành xuống dòng thực tế.
      return JSON.parse(cleanJsonStr(rawValue));
    } catch (err) {
      console.error("Lỗi khi parse overviewDetail:", err);
      // Fallback: thay thế thủ công nếu parse lỗi
      return rawValue.replace(/\\n/g, '\n').replace(/^"|"$/g, '');
    }
  }
  return "";
};

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
            <a href="#" title={`${language=='en'?'Address': 'Địa chỉ'}: ${t('address')}`}>{t('address')}</a>
          </p>
          <p className="flex items-center">
            <LucideIcons.Phone className="mr-3 text-sky-600" size={20} />
            <a href={`tel:${t('phone')}`} className="hover:underline" title={`${language=='en'?'Phone': 'Số điện thoại'}: ${t('phone')}`}>{t('phone')}</a>
          </p>
          <p className="flex items-center text-sky-600 lowercase">
            <LucideIcons.Mail className="mr-3 text-sky-600" size={20} />
            <a href={`mailto:${t('email')}`} className="hover:underline" title={`Email: ${t('email')}`}>{t('email')}</a>
          </p>
        </div>

        {/* Overview */}
        <div className="mt-10 space-y-6">
          <h3 className="text-3xl font-bold uppercase tracking-tighter">{t('overview')}</h3>
          <div className="text-gray-700 prose prose-sky max-w-none">
            <Markdown>{overviewDetail()}</Markdown>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 pt-6">
          {Array.isArray(overviewSocials)
            && overviewSocials.length > 0 &&
            overviewSocials.map((item: any, idx: number) => {
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