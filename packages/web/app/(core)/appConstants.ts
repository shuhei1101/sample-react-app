
export const ROOT_URL = process.env.NEXT_PUBLIC_API_URL

// ホーム
export const HOME_URL = `${ROOT_URL}/home`

// ログイン
export const LOGIN_URL = `${ROOT_URL}/login`

// タスク
export const TASKS_URL = `${ROOT_URL}/tasks`
export const TASK_NEW_URL = `${TASKS_URL}/new`
export const TASK_API_URL = `${TASKS_URL}/api`

// プロジェクト
export const PROJECTS_URL = `${ROOT_URL}/projects`
export const PROJECT_NEW_URL = `${PROJECTS_URL}/new`
export const PROJECT_API_URL = `${PROJECTS_URL}/api`

// プロフィール
export const PROFILE_URL = `${ROOT_URL}/user`
export const PROFILE_API_URL = `${PROFILE_URL}/api`
