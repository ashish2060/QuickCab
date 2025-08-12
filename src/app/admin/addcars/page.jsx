"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'
import { CldImage, CldUploadWidget } from 'next-cloudinary'


const AddCars = () => {

    const [carData, setCarData] = useState({ carName: "", noOfSeats: "", mpg: "", carType: "", carPhoto: "", pricePerHour: "" });
    const [cloudinarPublicId, setCloudinaryPublicId] = useState("")

    async function submitHandler(e) {
        e.preventDefault();

        if (!cloudinarPublicId) {
            toast.error("Carphoto is mendentary");
            return
        }

        if (!carData.carName && !carData.noOfSeats && !carData.mpg && !carData.carType) {
            toast.error("All fields are required")
        } else {

            await fetch("/api/addcars", {
                method: "POST",

                body: JSON.stringify(carData)
            }).then(res => { toast.success("Added To Database successfully"); setCarData({ carName: "", carPhoto: "", carType: "", mpg: "", pricePerHour: "", noOfSeats: "" }); setCloudinaryPublicId("") })
                .catch(error => console.log(error));
        }
    }

    function changeHandler(e) {
        setCarData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    function clearHandler(e) {
        e.preventDefault();
        setCarData({ carName: "", carPhoto: "", carType: "", mpg: "", pricePerHour: "", noOfSeats: "" });
        setCloudinaryPublicId("")
    }

    return (
        <div className='flex justify-center items-center'>

            <div className='border m-6 shadow-lg rounded-lg text-gray-400 min-w-[500px]'>
                <form className='space-y-4 p-6' onSubmit={submitHandler}>
                    {/* <div className='mx-auto text-center'><h1 className='gradient-title text-6xl'>ENCHANCE YOUR COLLECTION</h1></div> */}
                    {/* car photo */}
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="picture">Car Photo</Label>
                        {/* <Input id="picture" type="file" required onChange={(e) => setCarPhoto(URL.createObjectURL(e.target.files[0]))} name="carPhoto" /> */}

                        {
                            cloudinarPublicId && (
                                <CldImage src={cloudinarPublicId} width={300} height={180} alt={cloudinarPublicId} />
                            )
                        }

                        <CldUploadWidget uploadPreset='quick-cab' onSuccess={({ event, info }) => (setCloudinaryPublicId(info?.public_id, setCarData(prev => { return { ...prev, carPhoto: info?.secure_url } })))}>
                            {({ open }) => <button className='bg-blue-600 p-4 rounded-lg' onClick={() => open()}>Upload</button>}
                        </CldUploadWidget>
                    </div>
                    {/* car name */}
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="name">Car Name</Label>
                        <Input id="name" type='text' placeholder='Enter Car Name' required onChange={changeHandler} value={carData.carName} name="carName" />
                    </div>
                    {/* car seat */}
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="fuel">No of seats</Label>
                        <Input id="fuel" type='number' placeholder='eg:4' required onChange={changeHandler} value={carData.noOfSeats} name="noOfSeats" min="1" />
                    </div>
                    {/* car price per hour */}
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="pricePerHour">Price Per Hour</Label>
                        <Input id="pricePerHour" type='number' placeholder='eg:350' required onChange={changeHandler} value={carData.pricePerHour} name="pricePerHour" min="10" />
                    </div>
                    {/* car mpg */}
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="mpg">Miles Per Gallon</Label>
                        <Input id="mpg" type='number' placeholder='eg:35' required onChange={changeHandler} value={carData.mpg} name="mpg" min="10" />
                    </div>
                    {/* cartype */}
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Select required onValueChange={(value) => setCarData((prev) => { return { ...prev, carType: value } })} name='carType'>
                            <SelectTrigger className="w-[180px] ">
                                <SelectValue placeholder="Car Type" />
                            </SelectTrigger>
                            <SelectContent >
                                <SelectItem value="auto">Auto</SelectItem>
                                <SelectItem value="manual">Manual</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='flex justify-between items-center'>
                        <Button onClick={clearHandler}>Clear</Button>
                        <Button type="submit">Add To Database</Button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default AddCars