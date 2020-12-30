import React from "react";
import Button from "@material-ui/core/Button";

export default function Country() {
    return (
        <Button
            id="button"
            variant="contained"
            color="primary"
            href={"/country/" + props.name}
        >
            <div>
                {props.name} 
                <Image
                    height={12}
                    width={18}
                    link={
                    "http://purecatamphetamine.github.io/country-flag-icons/3x2/" +
                    props.data[0].country +
                    ".svg"
                    }
                />
            </div>
        </Button>
    )
}
