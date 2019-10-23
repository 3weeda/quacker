export default {
    palette: {
        primary: {
            light: '#33c9dc',
            main: '#ec9b3b',
            dark: '#d78018',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff6333',
            main: '#657786',
            dark: '#485560',
            contrastText: '#fff',
        },
    },
    spreadableStyles: {
        typography: {
            useNextVariants: true
        },
        login: {
            textAlign: 'center',
            userSelect: 'none',
            height: '100%',
        },
        watermark: {
            position: 'absolute',
            top: '-20vh',
            right: '20vh',
            height: '140vh',
            opacity: '.5'
        },
        image: {
            marginBottom: '16px',
            width: 50
        },
        textField: {
            margin: '10px auto',
            width: '100%',
            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ec9b3b'
            },
            '& label.Mui-focused ': {
                color: '#ec9b3b'
            },
            '& .MuiInputLabel-outlined': {
                transform: 'translate(14px, 17px)',
                fontSize: 14
            },
            '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
                transform: 'translate(14px, -6px) scale(0.75);'
            },
            '& .MuiOutlinedInput-input': {
                padding: '13.5px 14px'
            }
        },
        halfWidthTextField: {
            width: '40%'
        },
        button: {
            margin: '10px auto 10px',
            position: 'relative',
            textTransform: 'none',
            borderWidth: '2px',
            height: '46px',
            fontWeight: 'bold',
            '&:hover': {
                borderWidth: '2px',
            },
            '&:disabled': {
                borderWidth: '2px',
            },
        },
        customError: {
            color: '#D8000C',
            fontSize: '0.8rem',
            marginTop: 10
        },
        spinner: {
            position: 'absolute',
        },
        leftSide: {
            padding: 20,
            backgroundColor: '#ec9b3b',
        },
        rightSide: {
            padding: 20,
            backgroundColor: '#fff',
            zIndex: 3,
            position: 'relative'
        },
        icons: {
            display: 'flex',
            flexDirection: 'column',
            marginRight: '16px'
        },
        headlineIcon: {
            margin: '18px 0',
            width: 40
        },
        headlines: {
            height: '100%',
            color: '#fff',
            zIndex: 2,
            position: 'relative',
            textAlign: 'left'
        },
        headline: {
            fontSize: 18,
            fontWeight: 'bold',
            margin: '48px 0'
        },
        form: {
            display: 'flex',
            flexDirection: 'row',
            width: '95%',
            margin: 'auto',
            maxWidth: 550
        },
        signupBlock: {
            width: 350,
            textAlign: 'left',
            top: '48%'
        },
        signupHeadline: {
            fontSize: 27,
            fontWeight: 'bold'
        },
        join: {
            margin: '40px auto 16px',
            fontSize: 18,
            fontWeight: 'bold'
        },
        signupButton: {
            width: '100%',
            textTransform: 'none',
            color: '#fff',
            boxShadow: 'none',
            fontWeight: 'bold',
            '&:hover': {
                boxShadow: 'none',
            },
        },
        signupForm: {
            textAlign: 'center',
            userSelect: 'none',
            marginTop: '20px'
        },
        pageTitle: {
            fontSize: 23,
            fontWeight: 'bold',
            margin: '10px auto'
        },
        wideSignupButton: {
            margin: '10px auto 10px',
            position: 'relative',
            textTransform: 'none',
            borderWidth: '2px',
            height: '46px',
            width: '100%',
            fontWeight: 'bold',
            boxShadow: 'none',
            '&:hover': {
                boxShadow: 'none',
            },
        },
        small: {
            color: "#d78018",
            '&:hover': {
                textDecoration: 'underline'
            }
        },
        paper: {
            padding: 20
        },
        profile: {
            '& .image-wrapper': {
                textAlign: 'center',
                position: 'relative',
                '& button': {
                    position: 'absolute',
                    top: '80%',
                    left: '70%'
                }
            },
            '& .profile-image': {
                width: 200,
                height: 200,
                objectFit: 'cover',
                maxWidth: '100%',
                borderRadius: '50%',
            },
            '& .profile-details': {
                textAlign: 'center',
                '& span, svg': {
                    verticalAlign: 'middle'
                },
                '& a': {
                    color: '#ec9b3b',
                }
            },
            '& hr': {
                border: 'none',
                margin: '0 0 10px 0'
            },
            '& svg.button': {
                '&:hover': {
                    cursor: 'pointer'
                }
            }
        },
        buttons: {
            textAlign: 'center',
            '& a': {
                margin: '20px 10px',
                width: '25%'
            }
        }
    }
}