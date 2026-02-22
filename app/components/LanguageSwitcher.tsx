import { setLanguage } from "@/lib/gg_sheet/sheetSlice";
import { AppDispatch, RootState } from "@/lib/store";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";

const LanguageSwitcher = () => {
    const dispatch = useDispatch<AppDispatch>();
    const language = useSelector((state: RootState) => state.google_sheet.language);

    const handleToggle = (lang: 'en' | 'vi') => {
        dispatch(setLanguage(lang));
    };

    return (
        <div className="flex items-center justify-center lg:mt-10 lg:pt-8 lg:border-t lg:border-sky-600/50">
            <div className="inline-flex p-1 bg-sky-800/40 rounded-xl border border-sky-600/30 backdrop-blur-sm">
                <button
                    onClick={() => handleToggle('en')}
                    className={clsx(
                        "px-5 py-2 rounded-lg text-[10px] font-black tracking-[0.2em] transition-all duration-300 uppercase",
                        language === 'en' 
                            ? "bg-sky-500 text-white shadow-md shadow-sky-900/20 scale-100" 
                            : "text-sky-300 hover:text-sky-100 scale-95 opacity-80"
                    )}
                    title={`${language === 'en' ? 'English' : 'Tiếng Anh'}`}
                >
                    EN
                </button>

                <button
                    onClick={() => handleToggle('vi')}
                    className={clsx(
                        "px-5 py-2 rounded-lg text-[10px] font-black tracking-[0.2em] transition-all duration-300 uppercase",
                        language === 'vi' 
                            ? "bg-sky-500 text-white shadow-md shadow-sky-900/20 scale-100" 
                            : "text-sky-300 hover:text-sky-100 scale-95 opacity-80"
                    )}
                    title={`${language === 'en' ? 'Vietnamese' : 'Tiếng Việt'}`}
                >
                    VI
                </button>
            </div>
        </div>
    );
};

export default LanguageSwitcher;