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
      title
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
      acfCargoDescription {
        fullDescription
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
        customName
        customPhone
        paymentMethod
        budgetTo
      }
    }
  }
`
export const GET_TRANSPORT_CATEGORY = gql`
  query GetTransportCategory($id: ID!) {
    transportCategory(id: $id, idType: SLUG) {
      name
      slug
      transports {
        edges {
          node {
            author {
              node {
                customField {
                  verifiedUser
                }
              }
            }
            title
            databaseId
            id
            acfTransportAddress {
              regionTransport
              city
            }
            acfTransportFeatures {
              typeTransportation
              vehicleBodyType
              carryingCapacity
              vehicleBrand
              workExperience
              leaseTerm
              numberSeats
              numberSeatsWithoutLuggage
              serviceSpecialization
              options
              amenities
              vehicleClass
              color
              vehiclesInPark
              minimumOrderTime
              bodyWidth
              bodyVolume
              bodyLength
              bodyHeight
              price1Hour
              price1Km
              pricePerShift
            }
            acfTransportPhotos {
              photoTruck {
                mediaItemUrl
              }
            }
            acfTransportDescription {
              fullDescription
              views
            }
          }
        }
      }
    }
  }
`
export const GET_TRANSPORT_INFO = gql`
  query GetTransport($id: ID!) {
    transport(id: $id, idType: DATABASE_ID) {
      author {
        node {
          avatar {
            url
          }
          customField {
            verifiedUser
            transportInPark
          }
        }
      }
      title
      databaseId
      transportCategories {
        edges {
          node {
            name
            slug
          }
        }
      }
      acfTransportAddress {
        regionTransport
        city
      }
      acfTransportContacts {
        customName
        customPhone
        modeOperation
        paymentMethod
        paymentProcedure
        telegram
        viber
        whatsapp
      }
      acfTransportFeatures {
        workExperience
        vehiclesInPark
        vehicleClass
        vehicleBrand
        vehicleBodyType
        typeTransportation
        serviceSpecialization
        pricePerShift
        price1Km
        price1Hour
        options
        numberSeatsWithoutLuggage
        numberSeats
        minimumOrderTime
        leaseTerm
        color
        carryingCapacity
        bodyWidth
        bodyVolume
        bodyLength
        bodyHeight
        amenities
      }
      acfTransportPhotos {
        photoTruck {
          mediaItemUrl
        }
        photoDriver {
          mediaItemUrl
        }
      }
      acfTransportDescription {
        fullDescription
        views
      }
    }
  }
`

export const GET_ALL_TRANSPORT_CATEGORIES = gql`
  query GetAllTransportCategories {
    transportCategories(where: { childless: true }) {
      edges {
        node {
          slug
          name
        }
      }
    }
  }
`
export const GET_CATEGORIES_CARGO_TRANSPORT = gql`
  query GetCargo {
    transportCategory(id: "cargo-transport", idType: SLUG) {
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
    transportCategory(id: "passenger-transport", idType: SLUG) {
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
export const GET_USER_INFO = gql`
  query GetUserInfo {
    viewer {
      id
      databaseId
      username
      email
      firstName
      customField {
        phone
      }
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
            acfCargoDescription {
              fullDescription
              views
            }
          }
        }
      }
      transports {
        edges {
          node {
            author {
              node {
                customField {
                  verifiedUser
                }
              }
            }
            title
            databaseId
            acfTransportAddress {
              regionTransport
              city
            }
            acfTransportFeatures {
              typeTransportation
              vehicleBodyType
              carryingCapacity
              bodyWidth
              bodyVolume
              bodyLength
              bodyHeight
              price1Hour
              price1Km
              pricePerShift
            }
            acfTransportPhotos {
              photoTruck {
                mediaItemUrl
              }
            }
            acfTransportDescription {
              fullDescription
              views
            }
          }
        }
      }
    }
  }
`
export const UPDATE_USER = gql`
  mutation UpdateUser($firstName: String = "", $email: String = "", $userId: ID!, $phone: String = "") {
    updateUserCustom(input: { email: $email, firstName: $firstName, phone: $phone, userId: $userId }) {
      clientMutationId
    }
  }
`
export const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(input: { clientMutationId: "uniqueId", username: $username, password: $password }) {
      authToken
      refreshToken
      user {
        username
      }
    }
  }
`
export const REGISTER_USER = gql`
  mutation RegisterUser($firstName: String!, $username: String!, $email: String, $password: String!) {
    registerUser(input: { firstName: $firstName, username: $username, email: $email, password: $password }) {
      user {
        firstName
        username
        email
      }
    }
  }
`
export const UPDATE_VIEWS_COUNT = gql`
  mutation UpdateViews($postId: ID) {
    updateViewsCount(input: { postId: $postId }) {
      clientMutationId
    }
  }
`
export const ADD_NEW_CARGO = gql`
  mutation AddNewCargo(
    $shippingAddress: String = ""
    $shippingCity: String = ""
    $shippingRegion: String = ""
    $title: String = ""
    $unloadingRegion: String = ""
    $unloadingAdress: String = ""
    $unloadingCity: String = ""
    $unloadingCountry: String = ""
    $whatsapp: Boolean = false
    $viber: Boolean = false
    $weight: Int
    $vehicleBodyType: String = ""
    $typeTransportation: String = ""
    $typeLoading: String = ""
    $telegram: Boolean = false
    $budgetTo: Int
    $customName: String = ""
    $customPhone: String = ""
    $dateLoading: String = ""
    $dateUnloading: String = ""
    $movers: String = ""
    $paymentMethod: String = ""
    $fullDescription: String = ""
  ) {
    createCargoCustom(
      input: {
        title: $title
        shippingRegion: $shippingRegion
        shippingCity: $shippingCity
        shippingAddress: $shippingAddress
        unloadingAdress: $unloadingAdress
        unloadingCity: $unloadingCity
        unloadingCountry: $unloadingCountry
        unloadingRegion: $unloadingRegion
        weight: $weight
        viber: $viber
        vehicleBodyType: $vehicleBodyType
        whatsapp: $whatsapp
        typeTransportation: $typeTransportation
        typeLoading: $typeLoading
        telegram: $telegram
        paymentMethod: $paymentMethod
        movers: $movers
        dateUnloading: $dateUnloading
        customPhone: $customPhone
        customName: $customName
        budgetTo: $budgetTo
        dateLoading: $dateLoading
        fullDescription: $fullDescription
      }
    ) {
      clientMutationId
    }
  }
`
export const EDIT_CARGO = gql`
  mutation updateCargoCustom(
    $cargoId: ID
    $shippingAddress: String = ""
    $shippingCity: String = ""
    $shippingRegion: String = ""
    $title: String = ""
    $unloadingRegion: String = ""
    $unloadingAdress: String = ""
    $unloadingCity: String = ""
    $unloadingCountry: String = ""
    $whatsapp: Boolean = false
    $viber: Boolean = false
    $weight: Int
    $vehicleBodyType: String = ""
    $typeTransportation: String = ""
    $typeLoading: String = ""
    $telegram: Boolean = false
    $budgetTo: Int
    $customName: String = ""
    $customPhone: String = ""
    $dateLoading: String = ""
    $dateUnloading: String = ""
    $movers: String = ""
    $paymentMethod: String = ""
    $fullDescription: String = ""
  ) {
    updateCargoCustom(
      input: {
        cargoId: $cargoId
        title: $title
        shippingRegion: $shippingRegion
        shippingCity: $shippingCity
        shippingAddress: $shippingAddress
        unloadingAdress: $unloadingAdress
        unloadingCity: $unloadingCity
        unloadingCountry: $unloadingCountry
        unloadingRegion: $unloadingRegion
        weight: $weight
        viber: $viber
        vehicleBodyType: $vehicleBodyType
        whatsapp: $whatsapp
        typeTransportation: $typeTransportation
        typeLoading: $typeLoading
        telegram: $telegram
        paymentMethod: $paymentMethod
        movers: $movers
        dateUnloading: $dateUnloading
        customPhone: $customPhone
        customName: $customName
        budgetTo: $budgetTo
        dateLoading: $dateLoading
        fullDescription: $fullDescription
      }
    ) {
      clientMutationId
    }
  }
`

export const ADD_NEW_TRANSPORT = gql`
  mutation AddNewTransport(
    $bodyHeight: Int
    $bodyLength: Int
    $bodyVolume: Int
    $bodyWidth: Int
    $carryingCapacity: Int
    $category: String = ""
    $city: String = ""
    $customPhone: String = ""
    $customName: String = ""
    $fullDescription: String = ""
    $whatsapp: Boolean = false
    $modeOperation: String = ""
    $paymentMethod: String = ""
    $paymentProcedure: String = ""
    $price1Hour: Int
    $price1Km: Int
    $pricePerShift: Int
    $regionTransport: String = ""
    $telegram: Boolean = false
    $title: String = ""
    $typeTransportation: String = ""
    $vehicleBodyType: String = ""
    $vehicleBrand: String = ""
    $workExperience: String = ""
    $leaseTerm: String = ""
    $numberSeats: String = ""
    $numberSeatsWithoutLuggage: String = ""
    $serviceSpecialization: String = ""
    $options: String = ""
    $amenities: String = ""
    $vehicleClass: String = ""
    $color: String = ""
    $vehiclesInPark: String = ""
    $minimumOrderTime: String = ""
    $viber: Boolean = false
    $photoTruck: [String]
    $photoDriver: String
  ) {
    createTransportCustom(
      input: {
        bodyHeight: $bodyHeight
        bodyLength: $bodyLength
        bodyVolume: $bodyVolume
        bodyWidth: $bodyWidth
        carryingCapacity: $carryingCapacity
        category: $category
        city: $city
        customName: $customName
        customPhone: $customPhone
        fullDescription: $fullDescription
        modeOperation: $modeOperation
        paymentMethod: $paymentMethod
        paymentProcedure: $paymentProcedure
        price1Hour: $price1Hour
        price1Km: $price1Km
        pricePerShift: $pricePerShift
        regionTransport: $regionTransport
        telegram: $telegram
        title: $title
        typeTransportation: $typeTransportation
        vehicleBodyType: $vehicleBodyType
        vehicleBrand: $vehicleBrand
        workExperience: $workExperience
        numberSeats: $numberSeats
        numberSeatsWithoutLuggage: $numberSeatsWithoutLuggage
        serviceSpecialization: $serviceSpecialization
        options: $options
        amenities: $amenities
        leaseTerm: $leaseTerm
        vehicleClass: $vehicleClass
        color: $color
        vehiclesInPark: $vehiclesInPark
        minimumOrderTime: $minimumOrderTime
        viber: $viber
        whatsapp: $whatsapp
        photoTruck: $photoTruck
        photoDriver: $photoDriver
      }
    ) {
      clientMutationId
    }
  }
`
export const EDIT_TRANSPORT = gql`
  mutation UpdateTransportCustom(
    $transportId: ID
    $bodyHeight: Int
    $bodyLength: Int
    $bodyVolume: Int
    $bodyWidth: Int
    $carryingCapacity: Int
    $category: String = ""
    $city: String = ""
    $customPhone: String = ""
    $customName: String = ""
    $fullDescription: String = ""
    $whatsapp: Boolean = false
    $modeOperation: String = ""
    $paymentMethod: String = ""
    $paymentProcedure: String = ""
    $price1Hour: Int
    $price1Km: Int
    $pricePerShift: Int
    $regionTransport: String = ""
    $telegram: Boolean = false
    $title: String = ""
    $typeTransportation: String = ""
    $vehicleBodyType: String = ""
    $vehicleBrand: String = ""
    $workExperience: String = ""
    $leaseTerm: String = ""
    $numberSeats: String = ""
    $numberSeatsWithoutLuggage: String = ""
    $serviceSpecialization: String = ""
    $options: String = ""
    $amenities: String = ""
    $vehicleClass: String = ""
    $color: String = ""
    $vehiclesInPark: String = ""
    $minimumOrderTime: String = ""
    $viber: Boolean = false
    $photoTruck: [String]
    $photoDriver: String
  ) {
    updateTransportCustom(
      input: {
        transportId: $transportId
        bodyHeight: $bodyHeight
        bodyLength: $bodyLength
        bodyVolume: $bodyVolume
        bodyWidth: $bodyWidth
        carryingCapacity: $carryingCapacity
        category: $category
        city: $city
        customName: $customName
        customPhone: $customPhone
        fullDescription: $fullDescription
        modeOperation: $modeOperation
        paymentMethod: $paymentMethod
        paymentProcedure: $paymentProcedure
        price1Hour: $price1Hour
        price1Km: $price1Km
        pricePerShift: $pricePerShift
        regionTransport: $regionTransport
        telegram: $telegram
        title: $title
        typeTransportation: $typeTransportation
        vehicleBodyType: $vehicleBodyType
        vehicleBrand: $vehicleBrand
        workExperience: $workExperience
        numberSeats: $numberSeats
        numberSeatsWithoutLuggage: $numberSeatsWithoutLuggage
        serviceSpecialization: $serviceSpecialization
        options: $options
        amenities: $amenities
        leaseTerm: $leaseTerm
        vehicleClass: $vehicleClass
        color: $color
        vehiclesInPark: $vehiclesInPark
        minimumOrderTime: $minimumOrderTime
        viber: $viber
        whatsapp: $whatsapp
        photoTruck: $photoTruck
        photoDriver: $photoDriver
      }
    ) {
      clientMutationId
    }
  }
`
export const DELETE_TRANSPORT = gql`
  mutation DeleteTransport($id: ID!) {
    deleteTransport(input: { id: $id }) {
      clientMutationId
    }
  }
`
export const SEND_SUPPORT_MAIL = gql`
  mutation sendSupportMail($to: String, $from: String, $body: String, $subject: String) {
    sendEmail(input: { to: $to, from: $from, subject: $subject, body: $body }) {
      sent
    }
  }
`
