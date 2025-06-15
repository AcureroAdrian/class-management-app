import React from 'react'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { TAttendanceStatus } from './common-types'
import { getStatusIconInfo, getStatusColor } from './attendance-helpers'

interface StatusIconProps {
	status: TAttendanceStatus
	size?: number
	color?: string
}

const StatusIcon: React.FC<StatusIconProps> = ({ status, size = 24, color }) => {
	const iconInfo = getStatusIconInfo(status)
	const iconColor = color || getStatusColor(status)

	if (iconInfo.library === 'FontAwesome') {
		return <FontAwesome name={iconInfo.name as any} size={size} color={iconColor} />
	} else {
		return <AntDesign name={iconInfo.name as any} size={size} color={iconColor} />
	}
}

export default StatusIcon 