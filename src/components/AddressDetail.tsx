import { useForm } from "react-hook-form";
import { Box, Button, Grid } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import Style from "./Registration.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import { useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";
import { apiFetchCountry } from "../services/country";
import { userActions } from "../store/users";
const stateAndCityMap: any = new Map([
    ["Uttar Pradesh", ["Meerut", "Noida", "Lucknow", "Kanpur", "Varanasi"]],
    ["Haryana", ["Gurgao", "Shimla"]],
    ["Gujrat", ["Surat", "Ahemdabad", "Dwarka"]],
]);
const stateList = [...stateAndCityMap.keys()];
// import { useState } from "react";
let addressSchema = yup.object({
    address: yup
        .string()
        .notRequired()
        .nullable()
        .typeError("Please Enter valid address")
        .transform((value) => (value ? value : null)),
    state: yup
        .string()
        .notRequired()
        .nullable()
        .typeError("Please Enter valid state")
        .transform((value) => (value ? value : null)),
    city: yup
        .string()
        .notRequired()
        .nullable()
        .typeError("Please Enter valid state")
        .transform((value) => (value ? value : null)),
    country: yup
        .string()
        .notRequired()
        .nullable()
        .typeError("Please Enter valid state")
        .transform((value) => (value ? value : null)),
    pincode: yup
        .string()
        .matches(/^(\d{4}|\d{6})$/)
        .notRequired()
        .nullable()
        .typeError("Please Enter valid state")
        .transform((value) => (value ? value : null)),
});

export default function AddressDetail(props: any) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(addressSchema),
    });
    const dispatch = useDispatch();
    const currentUser = useSelector((state: any) => state.currentUser);
    // setting form state
    const [state, setState] = useState("");
    const [cityList, setCityList]: any = useState([]);
    useEffect(() => {
        if (!state) return;
        setCityList([...stateAndCityMap.get(state)]);
    }, [state]);
    const {
        response: countryDataGot,
        isLoading: isCountryFetching,
        apiFunc: apiGetCountryListFunc,
    } = useHttp();
    // getting country data
    useEffect(() => {
        apiGetCountryListFunc(apiFetchCountry);
    }, [apiGetCountryListFunc]);
    // on form submit
    const onSubmitHandler = (data: any) => {
        dispatch(
            userActions.addUser({
                ...data,
                ...currentUser,
            })
        );
        props.setIsAtAddress(false);
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
                    <Grid
                        item
                        sx={{ mx: "auto" }}
                        container
                        spacing={1}
                        xs={12}
                        sm={10}
                        style={{
                            borderTop: "4px solid #bababa",
                            backgroundColor: "rgba(227, 228, 228, 0.2)",
                        }}
                    >
                        <Grid item xs={12}>
                            <div className={Style["first-form-title"]}>
                                Address Details
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <label htmlFor="address">Address</label>
                            <div className={Style["input-container"]}>
                                <input
                                    {...register("address")}
                                    placeholder="Enter Address"
                                    className={`${Style["input-margin"]} ${
                                        errors.address
                                            ? Style["on-input-error"]
                                            : ""
                                    }`}
                                    id="address"
                                />
                                <span
                                    hidden={errors.address ? false : true}
                                    className={Style["on-input-error"]}
                                >
                                    Enter valid address
                                </span>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6} lg={5}>
                            <label htmlFor="state">State</label>
                            <div className={Style["input-container"]}>
                                <select
                                    {...register("state")}
                                    id="state"
                                    className={`${Style["input-margin"]} ${
                                        errors.state
                                            ? Style["on-input-error"]
                                            : ""
                                    }`}
                                    onChange={(e) => {
                                        setState(e.target.value);
                                    }}
                                >
                                    <option value="" hidden>
                                        Select state
                                    </option>
                                    {stateList.map((stateName, key) => (
                                        <option key={key}>{stateName}</option>
                                    ))}
                                </select>
                                <span
                                    hidden={errors.state ? false : true}
                                    className={Style["on-input-error"]}
                                >
                                    Enter valid state
                                </span>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <label htmlFor="city">City</label>
                            <div className={Style["input-container"]}>
                                <select
                                    {...register("city")}
                                    className={`${Style["input-margin"]} ${
                                        errors.city
                                            ? Style["on-input-error"]
                                            : ""
                                    }`}
                                    id="city"
                                >
                                    <option value="" hidden>
                                        Select City
                                    </option>
                                    {cityList.map((cityName: any, key: any) => (
                                        <option key={key}>{cityName}</option>
                                    ))}
                                </select>
                                <span
                                    hidden={errors.city ? false : true}
                                    className={Style["on-input-error"]}
                                >
                                    Select your gender
                                </span>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <label htmlFor="country">Country</label>
                            <div className={Style["input-container"]}>
                                <select
                                    {...register("country")}
                                    className={`${Style["input-margin"]} ${
                                        errors.country
                                            ? Style["on-input-error"]
                                            : ""
                                    }`}
                                    id="country"
                                >
                                    <option value="" hidden>
                                        {isCountryFetching
                                            ? "Fetching..."
                                            : "Select Country"}
                                    </option>
                                    {countryDataGot &&
                                        countryDataGot.map(
                                            (country: any, key: any) => (
                                                <option key={key}>
                                                    {country.name.common}
                                                </option>
                                            )
                                        )}
                                </select>
                                <span
                                    hidden={errors.country ? false : true}
                                    className={Style["on-input-error"]}
                                >
                                    Enter correct country
                                </span>
                            </div>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <label htmlFor="pincode">Pincode</label>
                            <div className={Style["input-container"]}>
                                <input
                                    {...register("pincode")}
                                    className={`${Style["input-margin"]} ${
                                        errors.pincode
                                            ? Style["on-input-error"]
                                            : ""
                                    }`}
                                    placeholder="Enter pincode"
                                    id="pincode"
                                />
                                <span
                                    hidden={errors.pincode ? false : true}
                                    className={Style["on-input-error"]}
                                >
                                    Enter correct pincode
                                </span>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            {/* <button type="submit">Next</button> */}
                            <Button variant="contained" type="submit">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </>
    );
}
