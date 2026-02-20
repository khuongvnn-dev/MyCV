import { cleanJsonStr, getDataByKey } from "@/helpers/GGSheetHelper";
import TreeView from "./TreeView";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

const Education = () => {

  const { data, loading } = useSelector((state: RootState) => state.google_sheet);

  const t = (key: string) => getDataByKey(data, 'vi', key);
  
  const careerPath = () => {
    if (!loading && data && data.length > 0) {
      try {
        const careerData = JSON.parse(cleanJsonStr(t('career-path')));
        return <TreeView items={careerData} title={t('h-background')} />;
      } catch (err) {
        console.error("Error parsing career path data:", err);
      }
    }
  }

  return (
    <section id="background" className="py-10 scroll-mt-14 lg:scroll-mt-0">
      <h2 className="text-4xl font-bold uppercase mb-10">{t('h-background')}</h2>

      {careerPath()}
    </section>
  );
};

export default Education;