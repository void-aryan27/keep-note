import { useForm } from "react-hook-form";
import { useState } from "react";
import {
    Button,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
    Box,
    IconButton,
    Paper,
    Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export function AddNoteForm({ addnotes }) {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const [showForm, setShowForm] = useState(false);

    const onSubmit = (data) => {
        addnotes(data);
        reset();
    };

    return (
        <Box sx={{ textAlign: "center", mt: 4 }}>
            {!showForm && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setShowForm(true)}
                >
                    Add Notes
                </Button>
            )}

            {showForm && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "100vh",
                    }}
                >
                    <Paper
                        elevation={6}
                        sx={{
                            position: "relative",
                            backgroundColor: "#f4e1d2",
                            p: 3,
                            width: 400,
                            borderRadius: 2,
                        }}
                    >
                        <IconButton
                            onClick={() => setShowForm(false)}
                            sx={{ position: "absolute", top: 8, right: 8 }}
                        >
                            <CloseIcon />
                        </IconButton>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        {...register("firstName", {
                                            required: "First Name is required",
                                        })}
                                        error={!!errors.firstName}
                                        helperText={errors.firstName?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        {...register("lastName", {
                                            required: "Last Name is required",
                                        })}
                                        error={!!errors.lastName}
                                        helperText={errors.lastName?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        {...register("email", {
                                            required: "Email should not be empty",
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@example\.com$/,
                                                message: "Use format: user@example.com",
                                            },
                                        })}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        {...register("password", {
                                            required: "Password should not be empty",
                                            minLength: {
                                                value: 8,
                                                message: "At least 8 characters",
                                            },
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                                                message: "Must include upper, lower, number, symbol",
                                            },
                                        })}
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Confirm Password"
                                        type="password"
                                        {...register("cpwd", {
                                            required: "Confirm password is required",
                                            validate: (value) =>
                                                value === watch("password") || "Passwords do not match",
                                        })}
                                        error={!!errors.cpwd}
                                        helperText={errors.cpwd?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography>Gender</Typography>
                                    <RadioGroup row>
                                        <FormControlLabel
                                            control={<Radio {...register("gender")} value="male" />}
                                            label="Male"
                                        />
                                        <FormControlLabel
                                            control={<Radio {...register("gender")} value="female" />}
                                            label="Female"
                                        />
                                        <FormControlLabel
                                            control={<Radio {...register("gender")} value="non-binary" />}
                                            label="Non-Binary"
                                        />
                                    </RadioGroup>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Age"
                                        type="number"
                                        {...register("age", {
                                            min: { value: 18, message: "Minimum age is 18" },
                                        })}
                                        error={!!errors.age}
                                        helperText={errors.age?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        {...register("phone", {
                                            required: "Phone number is required",
                                            pattern: {
                                                value: /^[789]\d{9}$/,
                                                message: "Must be 10 digits, starts with 7/8/9",
                                            },
                                        })}
                                        error={!!errors.phone}
                                        helperText={errors.phone?.message}
                                    />
                                </Grid>

                                {/* Address Fields */}
                                <Grid item xs={12}>
                                    <Typography>Address</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Street"
                                        {...register("address.street", {
                                            required: "Street is required",
                                        })}
                                        error={!!errors.address?.street}
                                        helperText={errors.address?.street?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="City"
                                        {...register("address.city", {
                                            required: "City is required",
                                        })}
                                        error={!!errors.address?.city}
                                        helperText={errors.address?.city?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="State"
                                        {...register("address.state", {
                                            required: "State is required",
                                        })}
                                        error={!!errors.address?.state}
                                        helperText={errors.address?.state?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Zipcode"
                                        {...register("address.zipcode", {
                                            required: "Zipcode is required",
                                            pattern: {
                                                value: /^[0-9]{6}$/,
                                                message: "Zipcode must be 6 digits",
                                            },
                                        })}
                                        error={!!errors.address?.zipcode}
                                        helperText={errors.address?.zipcode?.message}
                                    />
                                </Grid>

                              
                                <Grid item xs={12} container justifyContent="space-between">
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => reset()}
                                    >
                                        Reset
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Box>
            )}
        </Box>
    );
}
