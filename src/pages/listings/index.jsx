import useListing from '@/listing/useListing'
import { useEffect, useState } from 'react';
import Item from '@/components/Gallery/Item'
import { Container, Row, Col } from 'react-bootstrap';
import { PrivateLayout } from "@/components/Layouts"

const Listings = () => {
  const { listings, getPage } = useListing()
  const [page, setPage] = useState(1)

  const fetchPage = async () => {
    await getPage(page)
    setPage(page + 1)
  }

  useEffect(() => {
    fetchPage(0)
  }, [])

  return (
    <Container fluid className="text-center">
      <h1>Listings</h1>
      <Row>
        {listings.map((listing) => {
          return (
            <Col key={listing.id} xs={12} lg={6}>
              <Item listing={listing} />
            </Col>
            )
        })}
      </Row>
      <button onClick={fetchPage}>Next!</button>
    </Container>
  );
}

Listings.getLayout = function getLayout(page) {
  return <PrivateLayout>{page}</PrivateLayout>
}

export default Listings
