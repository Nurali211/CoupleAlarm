import { useState } from 'react'
import AuthModal from './components/AuthModal'
import BottomNav from './components/BottomNav'
import Header from './components/Header'
import UpgradeModal from './components/UpgradeModal'
import AlarmsPage from './pages/AlarmsPage'
import PeoplePage from './pages/PeoplePage'
import PlansPage from './pages/PlansPage'
import ProfilePage from './pages/ProfilePage'
import { Tab } from './types'
const pages = { alarms: AlarmsPage, people: PeoplePage, plans: PlansPage, profile: ProfilePage }
export default function App() {
  const [tab, setTab] = useState<Tab>('alarms')
  const Page = pages[tab]
  return (
    <div className="mx-auto flex h-dvh max-w-md flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto pb-24 pt-2"><Page /></main>
      <BottomNav tab={tab} onChange={setTab} />
      <AuthModal /><UpgradeModal />
    </div>
  )
}
