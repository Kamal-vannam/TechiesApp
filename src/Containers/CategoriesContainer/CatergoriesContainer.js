import React, { useEffect } from 'react'
import { View, Text, Alert } from 'react-native'
import api from '../../api/index'

const CatergoriesContainer = () => {


    useEffect(() => {
        getDocotordetails()
    }, [])

    const getDocotordetails = async () => {

        const payload = {
            TENANT_ID: 72

        }


        const res = await api.user.Getdetails(payload)
        console.log("res", res)
    }

    return (
        <View>
            <Text>CatergoriesContainer</Text>
        </View>
    )
}

export default CatergoriesContainer
