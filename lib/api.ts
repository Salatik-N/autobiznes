import { gql } from '@apollo/client'

export const GET_ALL_CARGO = gql`
  query GetCargo {
    cargos {
      edges {
        node {
          slug
          databaseId
          acfCargoPickupPoint {
            shippingAddress
            dateLoading
            shippingCity
          }
          acfCargoDeliverPoint {
            dateUnloading
            unloadingCountry
            unloadingCity
          }
          acfCargoFeatures {
            weight
            vehicleBodyType
            typeTransportation
            typeLoading
            movers
          }
          acfCargoContacts {
            budgetTo
            paymentMethod
          }
        }
      }
    }
  }
`
export const GET_FIVE_FIRST_CARGO = gql`
  query GetCargo {
    cargos(where: { orderby: { field: DATE, order: DESC } }, first: 5) {
      edges {
        node {
          slug
          databaseId
          acfCargoPickupPoint {
            shippingAddress
            dateLoading
            shippingCity
          }
          acfCargoDeliverPoint {
            dateUnloading
            unloadingCountry
            unloadingCity
          }
          acfCargoFeatures {
            movers
            typeLoading
            typeTransportation
            vehicleBodyType
            weight
          }
          acfCargoContacts {
            budgetTo
            paymentMethod
          }
        }
      }
    }
  }
`
export const GET_CARGO_INFO = gql`
  query GetCargoInfo($id: ID!) {
    cargo(id: $id, idType: DATABASE_ID) {
      author {
        node {
          avatar {
            url
          }
          customField {
            phone
            fatherName
          }
          firstName
          lastName
        }
      }
      acfCargoDiscription {
        description
      }
      acfCargoFeatures {
        movers
        typeLoading
        typeTransportation
        vehicleBodyType
        weight
      }
      acfCargoPickupPoint {
        shippingAddress
        dateLoading
        shippingCity
      }
      acfCargoDeliverPoint {
        dateUnloading
        unloadingCountry
        unloadingCity
      }
      acfCargoPickupPoint {
        shippingAddress
        dateLoading
        shippingCity
        shippingRegion
      }
      acfCargoDeliverPoint {
        dateUnloading
        unloadingCountry
        unloadingCity
        unloadingAdress
        unloadingRegion
      }
      acfCargoContacts {
        whatsapp
        viber
        telegram
        customPhone
      }
    }
  }
`
export const GET_CATEGORIES_CARGO_TRANSPORT = gql`
  query GetCargo {
    transportCategory(id: "12", idType: DATABASE_ID) {
      children {
        edges {
          node {
            name
            slug
          }
        }
      }
      name
    }
  }
`
export const GET_CATEGORIES_PASSENGER_TRANSPORT = gql`
  query GetCargo {
    transportCategory(id: "15", idType: DATABASE_ID) {
      children {
        edges {
          node {
            name
            slug
          }
        }
      }
      name
    }
  }
`
