import { cleanJsonStr, getDataByKey } from "@/helpers/GGSheetHelper";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import TreeView from "./TreeView";

const Projects = () => {

  const { data, loading } = useSelector((state: RootState) => state.google_sheet);
  const t = (key: string) => getDataByKey(data, 'vi', key);

  const careerPath = () => {
    if (!loading && data && data.length > 0) {
      try {
        const careerData = JSON.parse(cleanJsonStr(t('projects')));
        return <TreeView items={careerData} title={t('h-projects')} />;
      } catch (err) {
        console.error("Error parsing career path data:", err);
      }
    }
  }

  return (
    <section id="projects" className="py-10 scroll-mt-14 lg:scroll-mt-0">
      <h2 className="text-4xl font-bold uppercase mb-12">{t('h-projects')}</h2>
      {careerPath()}
    </section>
  );
};

export default Projects;