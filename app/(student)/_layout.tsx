import React from 'react'
import TabLayout from '@/components/TabLayout/TabLayout'
import { ITabItem } from '@/components/TabLayout/helpers/tab-layout-interfaces'

const StudentLayout = () => {
	const tabs: ITabItem[] = [
		{ id: 'admin-tab-item-1', name: 'index', label: 'Classes', icon: 'book' },
		{ id: 'admin-tab-item-2', name: 'report', label: 'Reports', icon: 'chart-box' },
		{ id: 'admin-tab-item-5', name: 'settings', label: 'Settings', icon: 'account-settings' },
	]
	return <TabLayout tabs={tabs} />
}

export default StudentLayout
