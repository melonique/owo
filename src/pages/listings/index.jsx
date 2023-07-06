import useListing from '@/listing/useListing'
import { useEffect, useState } from 'react';
import Item from '@/components/Gallery/Item'
import { Container, Row, Col } from 'react-bootstrap';
import { PublicLayout } from "@/components/Layouts"

const Listings = () => {
  const { listings, getPage } = useListing()
  const [page, setPage] = useState(1)

  const fetchPage = async () => {
    await getPage(page)
    setPage(page + 1)
  }

  useEffect(() => {
    fetchPage()
  }, [])

  return (
    <Container fluid className="text-center">
      <h1>Listings</h1>
      <Row>
        {listings.map((listing) => {
          return (
            <Col key={listing.id} xs={6} sm={6} md={4} lg={4}>
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
  return <PublicLayout>{page}</PublicLayout>
}

export default Listings
