import React from 'react'
import TabLayout from '@/components/TabLayout/TabLayout'
import { ITabItem } from '@/components/TabLayout/helpers/tab-layout-interfaces'

const AdminLayout = () => {
	const tabs: ITabItem[] = [
		{ id: 'admin-tab-item-1', name: 'index', label: 'Classes', icon: 'book' },
		{ id: 'admin-tab-item-2', name: 'report', label: 'Reports', icon: 'chart-box' },
		{ id: 'admin-tab-item-3', name: 'attendance', label: 'Attendance', icon: 'calendar' },
		{ id: 'admin-tab-item-4', name: 'students', label: 'Students', icon: 'account-group' },
		{ id: 'admin-tab-item-5', name: 'settings', label: 'Settings', icon: 'account-settings' },
	]
	return <TabLayout tabs={tabs} />
}

export default AdminLayout
