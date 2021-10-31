import { CircularProgress } from "@material-ui/core"

export const Loading = () => {
    return (
        <div className="main-container flex flex-col items-center h-screen justify-center">
            <CircularProgress size="15rem"/>
        </div>
    )
}