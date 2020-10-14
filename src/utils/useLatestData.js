import { useEffect, useState } from "react";

export default function useLatestData() {
    // hot slices
    const [hotSlices, setHotSclices] = useState();
    // slicemasters
    const [slicemasters, setSlicemasters] = useState();
    // use a side effect to fetch the data from graphql database
    useEffect(function() {
        //  when the component loads, fetch the data
        fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                query {
                    StoreSettings(id: "downtown") {
                     name
                     slicemaster {
                       name
                     }
                     hotSlices {
                       name
                     }
                   } 
                 } 
                `,
            })
        }).then(res => res.json()).then(res => {
            // todo check for errors
            // set the dat to state
            setHotSclices(res.data.StoreSettings.hotSlices);
            setSlicemasters(res.data.StoreSettings.slicemaster);
        })
    }, []);
    return {hotSlices, slicemasters }
}