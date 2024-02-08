import { Row, Figure } from "react-bootstrap";
import Listing from '@/components/Listing'
import { ButtonWithConfirm  } from '@/components'
import { useEffect } from 'react';
import useListing from '@/contexts/listing/useListing'
import useAuthentication from "@/contexts/authentication/useAuthentication"

const Badge = ({ name }) => (
  <Figure className="p-4">
    <Figure.Image
      width={171}
      height={180}
      alt={name}
      src={`https://source.boringavatars.com/beam/${name}?colors=6D9E37,F9C80E,B3C100,E55934,56CCF2`}
    />
    <Figure.Caption className="text-center">
      {name}
    </Figure.Caption>
  </Figure>
)

const UserListings = ({ }) => {
  const { listings, getAll, deleteListingById } = useListing()
  const { user } = useAuthentication() || {};

  useEffect(() => {
    getAll()
  }, [])

  return (
      <Row className="mt-3">
      {listings.filter(l => l.userProfile.id === user.id).length === 0 && <p className="text-center"> Vous n&apos;avez pas encore d&apos;annonces</p>}
        {user && listings.filter(l => l.userProfile.id === user.id).map((listing) => {
          return (
            <Listing listing={listing} noProfile key={listing.id}>
              <ButtonWithConfirm onClick={() => { deleteListingById(listing.id) }}>Supprimer</ButtonWithConfirm>
            </Listing>
          )
        })}
      </Row>
  )
}
export default UserListings;
