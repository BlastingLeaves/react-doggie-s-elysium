import { signInWithGoogle, signOut, signInWithFacebook } from '../../apis/firebase/firebase';

function startLoading() {
    return {
        type: 'START_LOADING'
    }
}
function updateUserData(payload) {
    return {
        type: 'UPDATE_USER_DATA',
        payload
    }
}
function updateUserError(payload) {
    return {
        type: 'UPDATE_USER_ERROR',
        payload
    }
}

export function loginUser(authMethod) {
    return (dispatch) => {
        dispatch(startLoading());

        let signInPromise = null;
        if (authMethod === 'google') {
            signInPromise = signInWithGoogle();
        } else if (authMethod === 'facebook') {
            signInPromise = signInWithFacebook();
        } else {
            dispatch(updateUserError(new Error('Unsupported auth method')));
            return;
        }

        signInPromise.then(userData => {
            dispatch(updateUserData(userData.user));
        }).catch(error => {
            dispatch(updateUserError(error));
        })
    }
}

export function logoutUser() {
    return dispatch => {
        dispatch(startLoading());

        signOut().then(() => {
            dispatch(updateUserData(null));
        }).catch((error) => {
            dispatch(updateUserError(error));
        });
    }
}