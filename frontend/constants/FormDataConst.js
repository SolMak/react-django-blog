import {string, boolean, mixed, number} from "yup";
import zxcvbn from 'zxcvbn';
import {ADMIN_POST_TABLE_COLUMNS, ADMIN_USER_TABLE_COLUMNS, ICON_FILE_SIZE, ICON_SUPPORTED_FORMATS} from "./index";
import {isEmpty} from "../lib/utils";

export const checkIfFilesAreTooBig = (files) => {
    let valid = true;
    if (files) {
        for (let i = 0; i < files.length; i++) {
            const size = files[i].size / 1024 / 1024;
            if (size > ICON_FILE_SIZE) {
                valid = false
            }
        }
    }
    return valid
};

export const checkIfFilesAreCorrectType = (files) => {
    let valid = true;
    if (files) {
        for (let i = 0; i < files.length; i++) {
            if (!ICON_SUPPORTED_FORMATS.includes(files[i].type)) {
                valid = false
            }
        }
    }
    return valid
};

export const passwordStrengthCheck = (password) => {
    return zxcvbn(password).score >= 3;
};

export const FORM_DATA = {
    USER_DISPLAY: {
        elements: ADMIN_USER_TABLE_COLUMNS,
        validationSchema: {
            profile_img: mixed()
                .test('profile img file type', 'invalid file type',value => checkIfFilesAreCorrectType(value))
                .test('profile img file size',`file is too large (max is ${ICON_FILE_SIZE} MB)`, value => checkIfFilesAreTooBig(value)),
            first_name: string().required(),
            last_name: string().required(),
            email: string().email().required(),
            is_staff: boolean().required(),
            is_superuser: boolean().required(),
        },
    },
    NEW_USER_FORM: {
        elements: [
            {
                label: 'Icon',
                accessor: 'profile_img',
                type: 'image',
                editable: true,
                formLength: 'full',
                multiple: false,
                accept: 'image/*'
            },
            {
                label: 'First Name',
                accessor: 'first_name',
                type: 'text',
                editable: true,
                formLength: '1/2',
            },
            {
                label: 'Last Name',
                accessor: 'last_name',
                type: 'text',
                editable: true,
                formLength: '1/2',
            },
            {
                label: 'Email',
                accessor: 'email',
                type: 'text',
                searchType: 'equal',
                editable: true,
                formLength: 'full',
            },
            {
                label: 'Password',
                accessor: 'password',
                type: 'password',
                editable: true,
                formLength: 'full',
            },
            {
                label: "staff",
                accessor: "is_staff",
                type: 'boolean',
                editable: true,
                formLength: 'full',
            },
            {
                label: "super admin",
                accessor: "is_superuser",
                type: 'boolean',
                editable: true,
                formLength: 'full',
            },
        ],
        validationSchema: {
            profile_img: mixed()
                .test('profile img file type', 'invalid file type',value => checkIfFilesAreCorrectType(value))
                .test('profile img file size',`file is too large (max is ${ICON_FILE_SIZE} MB)`, value => checkIfFilesAreTooBig(value)),
            first_name: string().required(),
            last_name: string().required(),
            email: string().email().required(),
            password: string().min(8).required().test('password', 'The password is too common', value => passwordStrengthCheck(value)),
            is_staff: boolean().required(),
            is_superuser: boolean().required(),
        },
    },
    EDIT_USER_FORM: {
        elements: ADMIN_USER_TABLE_COLUMNS,
        validationSchema: {
            id: mixed().required(),
            profile_img: mixed()
                .test('profile img file type', 'invalid file type',value => checkIfFilesAreCorrectType(value))
                .test('profile img file size',`file is too large (max is ${ICON_FILE_SIZE} MB)`, value => checkIfFilesAreTooBig(value)),
            first_name: string().required(),
            last_name: string().required(),
            email: string().email().required(),
            is_staff: boolean().required(),
            is_superuser: boolean().required(),
        },
    },
};

export const POSTS_FORM_DATA = {
    elements: ADMIN_POST_TABLE_COLUMNS,
    validationSchema: {
        id: mixed().required(),
        title: string().required().min(1),
        content: string().required().min(1),
        main_img: mixed().required()
            .test('main image required', 'main image is required field', value => !isEmpty(value))
            .test('main image file type', 'invalid file type',value => checkIfFilesAreCorrectType(value))
            .test('main image file size',`file is too large (max is ${ICON_FILE_SIZE} MB)`, value => checkIfFilesAreTooBig(value)),
        category: string().required(),
        tags: string(),
        post_state: string().required(),
        meta_desc: string(),
        youtube_url: string(),
        user: number(),
        scheduled_at: mixed(),
    },
};

export const POSTS_EDIT_FORM_DATA = {
    elements: ADMIN_POST_TABLE_COLUMNS,
    validationSchema: {
        id: mixed().required(),
        title: string().required().min(1),
        content: string().required().min(1),
        main_img: mixed()
            .test('main image file type', 'invalid file type',value => checkIfFilesAreCorrectType(value))
            .test('main image file size',`file is too large (max is ${ICON_FILE_SIZE} MB)`, value => checkIfFilesAreTooBig(value)),
        category: string().required(),
        tags: string(),
        post_state: string().required(),
        meta_desc: string(),
        youtube_url: string(),
        user: number(),
        scheduled_at: mixed(),
    },
};

export const POST_SCHEDULED_OBJ = {
    id: 2,
    name: 'scheduled'
};