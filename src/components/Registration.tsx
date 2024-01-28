import { useForm } from "react-hook-form";
import { Box, Button, Grid } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import Style from "./Registration.module.css";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import moment from "moment";
import { currentUserActions } from "../store/currentUser";

// import { useState } from "react";
const phoneRegExp = /^[789]\d{9}$/;
let userSchema = yup.object({
    name: yup.string().min(3).required().typeError("Please Enter valid name"),
    age: yup
        .string()
        .transform((value) => {
            if (Number(value)) return value;
            if (moment(value).isValid()) {
                const y = moment().diff(value, "years");
                if (y < 0 || y > 300)
                    throw new yup.ValidationError(
                        new yup.ValidationError(
                            "age.invalid",
                            value,
                            "age",
                            "is-valid"
                        )
                    );
                return "" + y;
            }
            throw new yup.ValidationError(
                new yup.ValidationError("age.invalid", value, "age", "is-valid")
            );
        })
        .required(),
    sex: yup
        .string()
        .oneOf(["Male", "Female"])
        .required()
        .typeError("Please select your gender"),
    mobile: yup
        .string()
        .matches(phoneRegExp)
        .notRequired()
        .nullable()
        .transform((value) => (value ? value : null)),
    id_type: yup.string().oneOf(["Aadhar", "PAN", ""]).notRequired(),
    id_number: yup
        .string()
        .notRequired()
        .nullable()
        .test((value, context) => {
            if (!value) return true;
            const parentValue = context.parent.id_type;
            if (!parentValue) return true;
            const aadharPattern = /^[2-9]{1}[0-9]{11}$/;
            const panPattern = /^[a-z0-9]{10}$/i;
            if (parentValue === "Aadhar") return aadharPattern.test(value);
            if (parentValue === "PAN") return panPattern.test(value);
            return false;
        })
        .transform((value) => (value ? value : null)),
});

export default function Registration(props: any) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(userSchema),
    });
    const dispatch = useDispatch();
    const onSubmitHandler = (data: any) => {
        dispatch(
            currentUserActions.addUserValue({
                ...data,
            })
        );
        props.setIsAtAddress(true);
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
                                Personal Details
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <label htmlFor="name">
                                Name<sup className="required-text">*</sup>
                            </label>
                            <div className={Style["input-container"]}>
                                <input
                                    {...register("name")}
                                    placeholder="Enter Name"
                                    className={`${Style["input-margin"]} ${
                                        errors.name
                                            ? Style["on-input-error"]
                                            : ""
                                    }`}
                                    id="name"
                                />
                                <span
                                    hidden={errors.name ? false : true}
                                    className={Style["on-input-error"]}
                                >
                                    Name should has at least 3 characters
                                </span>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6} lg={5}>
                            <label htmlFor="age">
                                Date of Birth or Age
                                <sup className="required-text">*</sup>
                            </label>
                            <div className={Style["input-container"]}>
                                <input
                                    placeholder="DD/MM/YY or Age in Years"
                                    {...register("age")}
                                    id="age"
                                    className={`${Style["input-margin"]} ${
                                        errors.age
                                            ? Style["on-input-error"]
                                            : ""
                                    }`}
                                />
                                <span
                                    hidden={errors.age ? false : true}
                                    className={Style["on-input-error"]}
                                >
                                    Enter valid Age
                                </span>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <label htmlFor="sex">
                                Sex<sup className="required-text">*</sup>
                            </label>
                            <div className={Style["input-container"]}>
                                <select
                                    {...register("sex")}
                                    className={`${Style["input-margin"]} ${
                                        errors.sex
                                            ? Style["on-input-error"]
                                            : ""
                                    }`}
                                    id="sex"
                                >
                                    <option hidden>Select Sex</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                <span
                                    hidden={errors.sex ? false : true}
                                    className={Style["on-input-error"]}
                                >
                                    Select your gender
                                </span>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <label htmlFor="mobile">Mobile</label>
                            <div className={Style["input-container"]}>
                                <input
                                    {...register("mobile")}
                                    className={`${Style["input-margin"]} ${
                                        errors.mobile
                                            ? Style["on-input-error"]
                                            : ""
                                    }`}
                                    placeholder="Enter Mobile"
                                    id="mobile"
                                />
                                <span
                                    hidden={errors.mobile ? false : true}
                                    className={Style["on-input-error"]}
                                >
                                    Enter correct mobile
                                </span>
                            </div>
                        </Grid>
                        <Grid item xs={12} lg={8}>
                            <label htmlFor="id_type">Govt Issued ID</label>
                            <div className={Style["input-container"]}>
                                <select
                                    {...register("id_type")}
                                    className={`${Style["input-margin"]} ${
                                        errors.id_type
                                            ? Style["on-input-error"]
                                            : ""
                                    }`}
                                    id="id_type"
                                >
                                    <option value="" hidden>
                                        ID Type
                                    </option>
                                    <option value="Aadhar">Aadhar</option>
                                    <option value="PAN">PAN</option>
                                </select>
                                <span
                                    hidden={errors.id_type ? false : true}
                                    className={Style["on-input-error"]}
                                >
                                    Select Gov ID type
                                </span>
                            </div>
                            <div className={Style["input-container"]}>
                                <input
                                    {...register("id_number")}
                                    className={`${Style["input-margin"]} ${
                                        errors.id_number
                                            ? Style["on-input-error"]
                                            : ""
                                    }`}
                                    placeholder="Enter Govt ID"
                                />
                                <span
                                    hidden={errors.id_number ? false : true}
                                    className={Style["on-input-error"]}
                                >
                                    Enter correct Gov ID
                                </span>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            {/* <button type="submit">Next</button> */}
                            <Button variant="contained" type="submit">
                                Next
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </>
    );
}
