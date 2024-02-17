import Switch, { switchClasses } from '@mui/joy/Switch';
import { Theme } from '@mui/joy';
import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Togle({ status, userId }: any) {
    const [userStatus, setUserStatus] = useState(true)
    const fetchData = () => {
        let active
        const token = localStorage.getItem("Token")
        console.log(token)
        if (userStatus) {
            active = "not_active"
        } else {
            active = "active"
        }
        console.log(active)
        axios.post(`http://familybank.v1r.ir/api/admin/update_status/${userId}`, {
            status: active

        }, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        if (status === "active") {
            setUserStatus(true)
        } else {
            setUserStatus(false)
        }
    }, [status])

    return (
        <Switch
            onChange={() => {
                fetchData()
                setUserStatus(!userStatus)
            }}
            checked={userStatus}
            sx={(theme: Theme) => ({
                '--Switch-thumbShadow': '0 3px 7px 0 rgba(0 0 0 / 0.12)',
                '--Switch-thumbSize': '27px',
                '--Switch-trackWidth': '51px',
                '--Switch-trackHeight': '31px',
                '--Switch-trackBackground': '#EE5E52',
                [`& .${switchClasses.thumb}`]: {
                    transition: 'width 0.2s, left 0.2s',
                },
                '&:hover': {
                    '--Switch-trackBackground': '#EE5E52',
                },
                '&:active': {
                    '--Switch-thumbWidth': '32px',
                },
                [`&.${switchClasses.checked}`]: {
                    '--Switch-trackBackground': 'rgb(48 209 88)',
                    '&:hover': {
                        '--Switch-trackBackground': 'rgb(48 209 88)',
                    },
                },
            })}
        />
    );
}