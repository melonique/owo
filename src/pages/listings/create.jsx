import { useState } from 'react'
import { PictureInput, Form, Input } from '@/components/Form'
import { Container, Row, Col, Button, Card, Nav } from 'react-bootstrap';
import { PrivateLayout } from "@/components/Layouts"

const CreateListing = () => {
  const { token } = 'TOKEN' // TODO: make it work ; useAuthentication();
  const [listing, setListing] = useState(null)

  const cancel = () => {
    setListing(null);
  }

  const pictureToListing = (data) => {
    console.log('data 1', data)
    fetch('/api/listings/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(resp => {
        console.log('data 2', data)
        const generatedlisting = { ...resp, tags: resp.tags.join(', '), picture: data.picture }
        console.log('generatedlisting', generatedlisting)
        setListing(generatedlisting);
    })
  }

  const saveListing = (data) => {

  }

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={12} lg={6} xl={6} style={{ maxWidth: '600px' }}>
          <h1>Create a Listing</h1>
          <div className={!!listing ? 'd-none' : 'd-block'}>
            <Form onSubmit={pictureToListing}>
              <PictureInput
                name="picture"
                label="Choose or Take a Picture"
              />
            </Form>
          </div>

          {
            !!listing && <>
                <Card>
                  <Card.Img
                    src={listing.picture}
                  />
                <Card.Body>
                  <Form onSubmit={saveListing} defaultValues={listing}>
                    <Input
                      name="imageDescription"
                      label="Description"
                    />
                    <Input
                      name="title"
                      label="title"
                      rules={{
                        required: "Entrez un titre",
                      }}
                    />
                    <Input
                      name="description"
                      label="title"
                      rules={{
                        required: "Entrez une description",
                      }}

                    />
                    <Input
                      name="tags"
                      label="tags"
                      rules={{
                        required: "Entrez des tags",
                      }}
                    />
                  </Form>
                </Card.Body>

                  <Card.Footer>
                    <Nav variant="pills" defaultActiveKey="#first">
                      <Nav.Item>
                        <Button variant="link" className="px-0" onClick={cancel}>X Cancel</Button>
                      </Nav.Item>
                      <Nav.Item className="ml-auto">
                        <Button variant="success" type="submit">Publish</Button>
                      </Nav.Item>
                    </Nav>
                  </Card.Footer>
              </Card>
            </>
          }
        </Col>
      </Row>
    </Container>
  );
}

CreateListing.getLayout = function getLayout(page) {
  return <PrivateLayout>{page}</PrivateLayout>
}

export default CreateListing
