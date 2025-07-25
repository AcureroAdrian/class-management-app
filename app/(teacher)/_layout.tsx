import React from 'react'
import TabLayout from '@/components/TabLayout/TabLayout'
import { ITabItem } from '@/components/TabLayout/helpers/tab-layout-interfaces'

const TeacherLayout = () => {
	const tabs: ITabItem[] = [
		{ id: 'admin-tab-item-1', name: 'index', label: 'Attendance', icon: 'calendar' },
		{ id: 'admin-tab-item-2', name: 'settings', label: 'Settings', icon: 'account-settings' },
	]
	return <TabLayout tabs={tabs} />
}

export default TeacherLayout
