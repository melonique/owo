import useListing from '@/listing/useListing'
import { useState } from 'react';

const Listings = () => {
    const { listings, getPage } = useListing()
    const [page, setPage] = useState(1)

    const fetchPage = async () => {
        await getPage(page)
        setPage(page + 1)
    }

    return (
        <div>
            <h1>Listings</h1>

            {listings.map((listing) => {
                return (
                    <div key={listing.id}>
                        {JSON.stringify(listing)}
                    </div>
                )
            })}

            <button onClick={fetchPage}>Next!</button>
        </div>
    );
}

export default Listings