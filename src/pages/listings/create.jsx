import { PictureInput, Form } from '@/components/Form'
import { Container, Row, Col, Button, Navbar, ListGroup, FormControl, Spinner } from 'react-bootstrap';
import { PrivateLayout } from "@/components/Layouts"

const CreateListing = () => {

  const onSubmit = (data) => {
    console.log(data);
  }
  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={12} lg={6} xl={6} style={{ maxWidth: '600px' }}>
          <Form onSubmit={onSubmit}>
            <PictureInput
              name="picture"
              label="Choose or Take a Picture"
            />
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

CreateListing.getLayout = function getLayout(page) {
  return <PrivateLayout>{page}</PrivateLayout>
}

export default CreateListing
