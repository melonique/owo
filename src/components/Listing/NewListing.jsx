import PropTypes from 'prop-types';
import React from 'react';
import ListingLayout from '@/components/Listing/Layout'
import { Container, Row, Col, Button, Card, Nav } from 'react-bootstrap';
import { PictureInput, Form, Input, Textarea } from '@/components/Form'


const NewListing = ({ cancel, saveListing, listing }) => {
  return (
    <ListingLayout
      title={""}
      image={listing.picture}
      description={

        <Form onSubmit={saveListing} defaultValues={listing}>
          <Textarea
            name="imageDescription"
            label="Description"
            disabled
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
  );

}

NewListing.propTypes = {};

export default NewListing;
