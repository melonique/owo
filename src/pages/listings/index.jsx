import useListing from '@/listing/useListing'
import { useState } from 'react';
import Item from '@/components/Gallery/Item'
import { Container, Row, Col } from 'react-bootstrap';

const Listings = () => {
  const { listings, getPage } = useListing()
  const [page, setPage] = useState(1)

  const fetchPage = async () => {
    await getPage(page)
    setPage(page + 1)
  }

  return (
    <Container fluid className="text-center">
      <h1>Listings</h1>
      <Row>
        {listings.map((listing) => {
          return (
            <Col key={listing.id} md={4} lg={4}>
              <Item listing={listing} />
            </Col>
            )
        })}
      </Row>
      <button onClick={fetchPage}>Next!</button>
    </Container>
  );
}

export default Listings
