import { useState } from 'react'
import cn from 'classnames'
import { FaWandMagicSparkles } from "react-icons/fa6";
import { PictureInput, Form, Input, Textarea } from '@/components/Form'
import { Container, Row, Col, Button, Card, Nav } from 'react-bootstrap';
import { PrivateLayout } from "@/components/Layouts"
import ListingLayout from '@/components/Listing/Layout'


const CreateListing = () => {
  const { token } = 'TOKEN' // TODO: make it work ; useAuthentication();
  const [listing, setListing] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const cancel = () => {
    setListing(null);
  }

  const pictureToListing = (data) => {
    setIsLoading(true);
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
        const generatedlisting = { ...resp, tags: resp.tags.join(', '), picture: data.picture }
        setListing(generatedlisting);
        setIsLoading(false);
    })
  }

  const saveListing = (data) => {

  }

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={12} lg={6} xl={6} style={{ maxWidth: '600px' }}>

          <div className={cn(!!listing ? 'd-none' : 'd-block', 'position-relative')}>
            <Form onSubmit={pictureToListing}>
              <PictureInput
                name="picture"
                label="Choose or Take a Picture"
              />
            </Form>
            {isLoading &&
              <div className="full-width-height bg-light text-center d-flex align-items-center justify-content-center">
                <FaWandMagicSparkles size="2em" className="px-2"/>
                L'assistant owo est au travail et rédige votre annonce!
              </div>
            }
          </div>

          {
            !!listing && <>
            <ListingLayout
              title={""}
              image={listing.picture}
              description={

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
                  <Textarea
                    name="description"
                    label="description"
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
              }
              footer={(
                <Nav variant="pills" defaultActiveKey="#first">
                  <Nav.Item>
                    <Button variant="link" className="px-0" onClick={cancel}>X Cancel</Button>
                  </Nav.Item>
                  <Nav.Item className="ml-auto">
                    <Button variant="success" type="submit">Publish</Button>
                  </Nav.Item>
                </Nav>
              )}
            />
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
