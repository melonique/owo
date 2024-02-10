import PropTypes from 'prop-types';
import React from 'react';
import ListingLayout from '@/components/Listing/Layout'
import { Container, Row, Col, Button, Card, Nav } from 'react-bootstrap';
import { PictureInput, Form, Input, Textarea, ListingPriceInput } from '@/components/Form'


const NewListing = ({ cancel, saveListing, listing }) => {
  return (
    <ListingLayout
      title={""}
      image={listing.picture}
      left={<>
        {listing.imageDescription}
      </>}
      description={

        <Form onSubmit={saveListing} defaultValues={listing}>
          <Input
            name="title"
            label="Titre"
            rules={{
              required: "Entrez un titre",
            }}
          />
          <Textarea
            name="description"
            label="Description"
            rules={{
              required: "Entrez une description",
            }}

          />
          <Input
            name="tags"
            label="Tags"
            rules={{
              required: "Entrez des tags",
            }}
          />

          <ListingPriceInput
            name="price"
            label="Prix"
            rules={{
              required: "Entrez un prix",
            }}
          />

          <Nav variant="pills" defaultActiveKey="#first">
            <Nav.Item>
              <Button variant="link" className="px-0" onClick={cancel}>X Cancel</Button>
            </Nav.Item>
            <Nav.Item className="ml-auto">
              <Button variant="success" type="submit">Publier</Button>
            </Nav.Item>
          </Nav>
        </Form>
      }
      footer={""}
    />
  );

}

NewListing.propTypes = {};

export default NewListing;
