'use client'
import Sidebar from '../components/Sidebar'
import About from '../components/About'
import Education from '../components/Education'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import { fetchSheetData } from '@/lib/gg_sheet/sheetSlice'
import { useEffect } from 'react'
import { AppDispatch, RootState } from '@/lib/store'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/Spinner'

const PortfolioPage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.google_sheet);

  useEffect(() => {
    if (data.length === 0) {
      const cUrl = process.env.NEXT_PUBLIC_GG_SHEET || '';
      dispatch(fetchSheetData(cUrl));
    }
  }, [dispatch, data.length]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">

      {loading && data.length === 0 && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/50">
          <Spinner size="xl" />
        </div>
      )}

      <Sidebar />

      <main className="flex-1 lg:ml-72 p-6 lg:p-12 space-y-20 mt-16 lg:mt-0">
        <About />
        <hr className="border-gray-200" />
        <Education />
        <hr className="border-gray-200" />
        <Skills />
        <hr className="border-gray-200" />
        <Projects />
      </main>
    </div>
  )
}

export default PortfolioPage