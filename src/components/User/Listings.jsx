import { Navbar, Container, Button, Row, Col, Card, Tab, ListGroup, Figure } from "react-bootstrap";
import Item from '@/components/Gallery/Item'
import { ButtonWithConfirm  } from '@/components'
import { useEffect, useState } from 'react';
import useListing from '@/contexts/listing/useListing'



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
  const { listings, getPage } = useListing()
  const [page, setPage] = useState(1)

  const fetchPage = async () => {
    await getPage(page)
    setPage(page + 1)
  }

  useEffect(() => {
    fetchPage(0)
  }, [])

  const deleteListing = () => {

  }


  return (
      <Row>
        {listings.map((listing) => {
          return (
              <Item listing={listing} noProfile key={listing.id}>
                <>
                  <ButtonWithConfirm onClick={deleteListing}>Supprimer</ButtonWithConfirm>
                </>
              </Item>
          )
        })}
      </Row>
  )
}
export default UserListings;
