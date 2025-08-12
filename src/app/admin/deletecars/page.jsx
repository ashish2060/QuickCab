"use client"
import CarCard from '@/components/rentcar/CarCard';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import React, { useEffect, useState } from 'react'

const DeleteCars = () => {
    const [allCars, setAllCars] = useState();
    function fetchAllCars() {
        fetch("/api/fetchallcarsdata")
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data)
                setAllCars(data.data)
            });
    }
    useEffect(() => {
        fetchAllCars();
    }, []);

    function clickHandler(carId) {
        fetch("/api/deletecars", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(carId),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    fetchAllCars();
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="p-4">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {allCars?.map((car, index) => {
                    return (

                        <div key={index} className="w-[350px] bg-slate-50 rounded-xl">
                            <CarCard selectedCar={car} />


                            <div className="w-full">
                                {/* popover reject - yes or no */}
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button className="bg-red-500 py-2 px-8 hover:bg-red-700 w-full rounded-lg">
                                            Delete from database
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent sideOffset={-85} className='bg-slate-100'>
                                        <div className="flex gap-4 items-center">
                                            <div>Sure to delete car from database?</div>
                                            <Button
                                                variant="outline"
                                                className="bg-slate-100"
                                                onClick={() => clickHandler(car._id)}
                                            >
                                                Yes
                                            </Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>

                            </div>
                        </div>
                    )

                })}
            </div>
        </div>
    )
}

export default DeleteCars