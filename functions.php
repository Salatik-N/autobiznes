<?php

remove_action( 'register_new_user', 'wp_send_new_user_notifications' );

function generate_access_token() {
    $token = bin2hex(random_bytes(16));
    return $token;
}

function login_mutation($input) {
    $username = $input['username'];
    $password = $input['password'];
	$user = wp_authenticate($username, $password);
	if (is_a($user, 'WP_User')) {
    	$token = generate_access_token();
		return [
			'token' => $token,
			'user' => [
					'id' => $user->ID,
					'username' => $user->user_login,
					'email' => $user->user_email,
				],
			'success' => true,
		];
	} else {
			// Если авторизация не удалась, возвращаем ошибку авторизации
			throw new Exception('Invalid username or password');
		}
	}

function register_login_mutation() {
    register_graphql_mutation('login', [
        'inputFields' => [
            'username' => [
                'type' => 'String',
                'description' => __('Username or email address', 'your-textdomain'),
                'nullable' => false,
            ],
            'password' => [
                'type' => 'String',
                'description' => __('User password', 'your-textdomain'),
                'nullable' => false,
            ],
        ],
        'outputFields' => [
            'token' => [
                'type' => 'String',
                'description' => __('Access token', 'your-textdomain'),
                'resolve' => function ($payload) {
                    return $payload['token'];
                },
            ],
            'user' => [
                'type' => 'User',
                'description' => __('Authenticated user', 'your-textdomain'),
                'resolve' => function ($payload) {
                    return $payload['user'];
                },
            ],
'success' => [
        'type'        => 'Boolean',
        'description' => __( 'Indicates whether the login was successful or not', 'your-textdomain' ),
        'resolve'     => function( $payload ) {
          return $payload['success'];
        },
      ],
],
        'mutateAndGetPayload' => function ($input) {
            return login_mutation($input);
        },
    ]);
}
add_action('graphql_register_types', 'register_login_mutation');

function add_registered_date_field_to_graphql() {
    register_graphql_field( 'User', 'newDate', [
        'type' => 'String',
        'description' => 'Date and time of user registration',
        'resolve' => function( $user ) {
            return $user->user_registered;
        },
    ] );
}
add_action( 'graphql_register_types', 'add_registered_date_field_to_graphql' );

add_action('graphql_register_types', function () {

    $customposttype_graphql_single_name = "MyCustomPostType";

    register_graphql_field('RootQueryTo' . $customposttype_graphql_single_name . 'ConnectionWhereArgs', 'acfTransportAddress', [
        'type' => 'String',
        'description' => __('The ID of the post object to filter by', 'your-textdomain'),
    ]);
});

add_filter('graphql_post_object_connection_query_args', function ($query_args, $source, $args, $context, $info) {

    $post_object_id = $args['where']['acfTransportAddress'];

    if (isset($post_object_id)) {
        $query_args['meta_query'] = [
            [
                'key' => 'transports',
                'value' => $post_object_id,
                'compare' => '='
            ]
        ];
    }

    return $query_args;
}, 10, 5);

function custom_jwt_expiration( $expiration ) {
    return 86400;
}

add_filter('graphql_jwt_auth_expire', 'custom_jwt_expiration', 10);

add_action('graphql_register_types', function() {
  register_graphql_mutation('CreateCargoCustom', [
    'inputFields' => [
      'title' => [
        'type' => 'String',
        'description' => __('The title of the cargo.', 'your-textdomain'),
      ],
      'description' => [
        'type' => 'String',
        'description' => __('The description of the cargo.', 'your-textdomain'),
      ],
      'shippingRegion' => [
        'type' => 'String',
        'description' => __('The shipping region of the cargo.', 'your-textdomain'),
      ],
	  'shippingCity' => [
        'type' => 'String',
        'description' => __('The shipping city of the cargo.', 'your-textdomain'),
      ],
	  'shippingAddress' => [
        'type' => 'String',
        'description' => __('The shipping address of the cargo.', 'your-textdomain'),
      ],
	  'dateLoading' => [
        'type' => 'String',
        'description' => __('The shipping date of the cargo.', 'your-textdomain'),
      ],
	  'unloadingCountry' => [
        'type' => 'String',
        'description' => __('The unloading country of the cargo.', 'your-textdomain'),
      ],
      'unloadingRegion' => [
        'type' => 'String',
        'description' => __('The unloading region of the cargo.', 'your-textdomain'),
      ],
	  'unloadingCity' => [
        'type' => 'String',
        'description' => __('The unloading city of the cargo.', 'your-textdomain'),
      ],
	  'unloadingAdress' => [
        'type' => 'String',
        'description' => __('The unloading address of the cargo.', 'your-textdomain'),
      ],
	  'dateUnloading' => [
        'type' => 'String',
        'description' => __('The unloading date of the cargo.', 'your-textdomain'),
      ],
	  'weight' => [
        'type' => 'Int',
        'description' => __('The weight of the cargo.', 'your-textdomain'),
      ],
	  'movers' => [
        'type' => 'String',
        'description' => __('The movers of the cargo.', 'your-textdomain'),
      ],
	  'vehicleBodyType' => [
        'type' => 'String',
        'description' => __('The vehicle body type of the cargo.', 'your-textdomain'),
      ],
	  'typeLoading' => [
        'type' => 'String',
        'description' => __('The type loading of the cargo.', 'your-textdomain'),
      ],
	  'typeTransportation' => [
        'type' => 'String',
        'description' => __('The type transportation of the cargo.', 'your-textdomain'),
      ],
	  'customName' => [
        'type' => 'String',
        'description' => __('The custom name of the cargo.', 'your-textdomain'),
      ],
	  'customPhone' => [
        'type' => 'String',
        'description' => __('The custom phone date of the cargo.', 'your-textdomain'),
      ],
	  'whatsapp' => [
        'type' => 'Boolean',
        'description' => __('The whatsapp of the cargo.', 'your-textdomain'),
      ],
	  'viber' => [
        'type' => 'Boolean',
        'description' => __('The viber of the cargo.', 'your-textdomain'),
      ],
	  'telegram' => [
        'type' => 'Boolean',
        'description' => __('The telegram of the cargo.', 'your-textdomain'),
      ],
	  'paymentMethod' => [
        'type' => 'String',
        'description' => __('The payment method of the cargo.', 'your-textdomain'),
      ],
	  'budgetTo' => [
        'type' => 'Int',
        'description' => __('The type budget to of the cargo.', 'your-textdomain'),
      ],
	  'fullDescription' => [
        'type' => 'String',
        'description' => __('The full description to of the cargo.', 'your-textdomain'),
      ],
    ],
    'outputFields' => [
      'cargo' => [
        'type' => 'Cargo',
        'description' => __('The created cargo.', 'your-textdomain'),
        'resolve' => function($cargo, $args, $context, $info) {
          return $cargo;
        },
      ],
    ],
    'mutateAndGetPayload' => function ($input, $context, $info) {
	  // Extract the input values
	  $title = $input['title'];
	  $description = $input['description'];

	  // Create the cargo post
	  $cargoId = wp_insert_post([
		'post_type' => 'cargo',
		'post_title' => $title,
		'post_content' => $description,
		'post_status' => 'publish',
	  ]);
	  
	  // Array of ACF field names and their corresponding input field names
	  $acfFields = [
		'shipping-region' => 'shippingRegion',
		'shipping-city' => 'shippingCity',
		'shipping-address' => 'shippingAddress',
		'date-loading' => 'dateLoading',
		'unloading-country' => 'unloadingCountry',
		'unloading-region' => 'unloadingRegion',
		'unloading-city' => 'unloadingCity',
		'unloading-adress' => 'unloadingAdress',
		'date-unloading' => 'dateUnloading',
		'weight' => 'weight',
		'movers' => 'movers',
		'vehicle-body-type' => 'vehicleBodyType',
		'type-loading' => 'typeLoading',
		'type-transportation' => 'typeTransportation',
		'custom-name' => 'customName',
		'custom-phone' => 'customPhone',
		'whatsapp' => 'whatsapp',
		'viber' => 'viber',
		'telegram' => 'telegram',
		'payment-method' => 'paymentMethod',
		'budget-to' => 'budgetTo',
		'full-description' => 'fullDescription',
	  ];

	  // Update the ACF fields
	  foreach ($acfFields as $acfField => $inputField) {
		if (!empty($input[$inputField])) {
		  update_field($acfField, $input[$inputField], $cargoId);
		}
	  }

	  $payload = ['cargoId' => $cargoId];
	  foreach ($acfFields as $acfField => $inputField) {
		if (!empty($input[$inputField])) {
		  $payload[$acfField] = $input[$inputField];
		}
	  }
	  return $payload;
	},
  ]);
});

add_action('graphql_register_types', function() {
  register_graphql_mutation('UpdateCargoCustom', [
    'inputFields' => [
	  'cargoId' => [
        'type' => 'ID',
        'description' => __('The ID of the cargo post to update.', 'your-textdomain'),
      ],
      'title' => [
        'type' => 'String',
        'description' => __('The title of the cargo.', 'your-textdomain'),
      ],
      'description' => [
        'type' => 'String',
        'description' => __('The description of the cargo.', 'your-textdomain'),
      ],
      'shippingRegion' => [
        'type' => 'String',
        'description' => __('The shipping region of the cargo.', 'your-textdomain'),
      ],
	  'shippingCity' => [
        'type' => 'String',
        'description' => __('The shipping city of the cargo.', 'your-textdomain'),
      ],
	  'shippingAddress' => [
        'type' => 'String',
        'description' => __('The shipping address of the cargo.', 'your-textdomain'),
      ],
	  'dateLoading' => [
        'type' => 'String',
        'description' => __('The shipping date of the cargo.', 'your-textdomain'),
      ],
	  'unloadingCountry' => [
        'type' => 'String',
        'description' => __('The unloading country of the cargo.', 'your-textdomain'),
      ],
      'unloadingRegion' => [
        'type' => 'String',
        'description' => __('The unloading region of the cargo.', 'your-textdomain'),
      ],
	  'unloadingCity' => [
        'type' => 'String',
        'description' => __('The unloading city of the cargo.', 'your-textdomain'),
      ],
	  'unloadingAdress' => [
        'type' => 'String',
        'description' => __('The unloading address of the cargo.', 'your-textdomain'),
      ],
	  'dateUnloading' => [
        'type' => 'String',
        'description' => __('The unloading date of the cargo.', 'your-textdomain'),
      ],
	  'weight' => [
        'type' => 'Int',
        'description' => __('The weight of the cargo.', 'your-textdomain'),
      ],
	  'movers' => [
        'type' => 'String',
        'description' => __('The movers of the cargo.', 'your-textdomain'),
      ],
	  'vehicleBodyType' => [
        'type' => 'String',
        'description' => __('The vehicle body type of the cargo.', 'your-textdomain'),
      ],
	  'typeLoading' => [
        'type' => 'String',
        'description' => __('The type loading of the cargo.', 'your-textdomain'),
      ],
	  'typeTransportation' => [
        'type' => 'String',
        'description' => __('The type transportation of the cargo.', 'your-textdomain'),
      ],
	  'customName' => [
        'type' => 'String',
        'description' => __('The custom name of the cargo.', 'your-textdomain'),
      ],
	  'customPhone' => [
        'type' => 'String',
        'description' => __('The custom phone date of the cargo.', 'your-textdomain'),
      ],
	  'whatsapp' => [
        'type' => 'Boolean',
        'description' => __('The whatsapp of the cargo.', 'your-textdomain'),
      ],
	  'viber' => [
        'type' => 'Boolean',
        'description' => __('The viber of the cargo.', 'your-textdomain'),
      ],
	  'telegram' => [
        'type' => 'Boolean',
        'description' => __('The telegram of the cargo.', 'your-textdomain'),
      ],
	  'paymentMethod' => [
        'type' => 'String',
        'description' => __('The payment method of the cargo.', 'your-textdomain'),
      ],
	  'budgetTo' => [
        'type' => 'Int',
        'description' => __('The type budget to of the cargo.', 'your-textdomain'),
      ],
	  'fullDescription' => [
        'type' => 'String',
        'description' => __('The full description to of the cargo.', 'your-textdomain'),
      ],
    ],
    'outputFields' => [
      'cargo' => [
        'type' => 'Cargo',
        'description' => __('The created cargo.', 'your-textdomain'),
        'resolve' => function($cargo, $args, $context, $info) {
          return $cargo;
        },
      ],
    ],
    'mutateAndGetPayload' => function ($input, $context, $info) {
	  // Extract the input values
	  $cargoId = $input['cargoId'];
	  $title = $input['title'];
	  $description = $input['description'];

	  // Create the cargo post
	  wp_update_post([
        'ID' => $cargoId,
		'post_title' => $title,
		'post_content' => $description,
		'post_status' => 'publish',
	  ]);
	  
	  // Array of ACF field names and their corresponding input field names
	  $acfFields = [
		'shipping-region' => 'shippingRegion',
		'shipping-city' => 'shippingCity',
		'shipping-address' => 'shippingAddress',
		'date-loading' => 'dateLoading',
		'unloading-country' => 'unloadingCountry',
		'unloading-region' => 'unloadingRegion',
		'unloading-city' => 'unloadingCity',
		'unloading-adress' => 'unloadingAdress',
		'date-unloading' => 'dateUnloading',
		'weight' => 'weight',
		'movers' => 'movers',
		'vehicle-body-type' => 'vehicleBodyType',
		'type-loading' => 'typeLoading',
		'type-transportation' => 'typeTransportation',
		'custom-name' => 'customName',
		'custom-phone' => 'customPhone',
		'whatsapp' => 'whatsapp',
		'viber' => 'viber',
		'telegram' => 'telegram',
		'payment-method' => 'paymentMethod',
		'budget-to' => 'budgetTo',
		'full-description' => 'fullDescription',
	  ];
	  

	  // Update the ACF fields
	  foreach ($acfFields as $acfField => $inputField) {
		update_field($acfField, $input[$inputField], $cargoId);
	  }

	  $payload = ['cargoId' => $cargoId];
	  foreach ($acfFields as $acfField => $inputField) {
		$payload[$acfField] = $input[$inputField];
	  }
	  return $payload;
	},
  ]);
});

add_action('graphql_register_types', function() {
  register_graphql_mutation('CreateTransportCustom', [
    'inputFields' => [
	  'category' => [
        'type' => 'String',
        'description' => __('The category of the transport.', 'your-textdomain'),
      ],
      'title' => [
        'type' => 'String',
        'description' => __('The title of the transport.', 'your-textdomain'),
      ],
      'description' => [
        'type' => 'String',
        'description' => __('The description of the transport.', 'your-textdomain'),
      ],
      'regionTransport' => [
        'type' => 'String',
        'description' => __('The shipping region of the transport.', 'your-textdomain'),
      ],
	  'city' => [
        'type' => 'String',
        'description' => __('The shipping city of the transport.', 'your-textdomain'),
      ],
	  'customName' => [
        'type' => 'String',
        'description' => __('The custom name of the transport.', 'your-textdomain'),
      ],
	  'customPhone' => [
        'type' => 'String',
        'description' => __('The custom phone date of the transport.', 'your-textdomain'),
      ],
	  'whatsapp' => [
        'type' => 'Boolean',
        'description' => __('The whatsapp of the transport.', 'your-textdomain'),
      ],
	  'viber' => [
        'type' => 'Boolean',
        'description' => __('The viber of the transport.', 'your-textdomain'),
      ],
	  'telegram' => [
        'type' => 'Boolean',
        'description' => __('The telegram of the transport.', 'your-textdomain'),
      ],
	  'modeOperation' => [
        'type' => 'String',
        'description' => __('The mode operation of the transport.', 'your-textdomain'),
      ],
	  'paymentMethod' => [
        'type' => 'String',
        'description' => __('The payment method of the transport.', 'your-textdomain'),
      ],
	  'paymentProcedure' => [
        'type' => 'String',
        'description' => __('The type budget to of the transport.', 'your-textdomain'),
      ],
	  'vehicleBodyType' => [
        'type' => 'String',
        'description' => __('The vehicle body type of the transport.', 'your-textdomain'),
      ],
	  'typeTransportation' => [
        'type' => 'String',
        'description' => __('The type transportation of the transport.', 'your-textdomain'),
      ],
	  'vehicleBrand' => [
        'type' => 'String',
        'description' => __('The brand of the transport.', 'your-textdomain'),
      ],
	  'workExperience' => [
        'type' => 'String',
        'description' => __('The work experience of the transport.', 'your-textdomain'),
      ],
	  'leaseTerm' => [
        'type' => 'String',
        'description' => __('The lease term of the transport.', 'your-textdomain'),
      ],
	  'numberSeats' => [
        'type' => 'String',
        'description' => __('The number seats of the transport.', 'your-textdomain'),
      ],
	  'numberSeatsWithoutLuggage' => [
        'type' => 'String',
        'description' => __('The number seats without luggage of the transport.', 'your-textdomain'),
      ],
	  'serviceSpecialization' => [
        'type' => 'String',
        'description' => __('The service specialization of the transport.', 'your-textdomain'),
      ],
	  'options' => [
        'type' => 'String',
        'description' => __('The options of the transport.', 'your-textdomain'),
      ],
	  'amenities' => [
        'type' => 'String',
        'description' => __('The amenities of the transport.', 'your-textdomain'),
      ],
	  'vehicleClass' => [
        'type' => 'String',
        'description' => __('The vehicle class of the transport.', 'your-textdomain'),
      ],
	  'color' => [
        'type' => 'String',
        'description' => __('The color of the transport.', 'your-textdomain'),
      ],
	  'vehiclesInPark' => [
        'type' => 'Int',
        'description' => __('The vehicles in park of the transport.', 'your-textdomain'),
      ],
	  'minimumOrderTime' => [
        'type' => 'Int',
        'description' => __('The minimum order time of the transport.', 'your-textdomain'),
      ],
	  'price1Hour' => [
        'type' => 'Int',
        'description' => __('The price for 1 hour of the transport.', 'your-textdomain'),
      ],
	  'pricePerShift' => [
        'type' => 'Int',
        'description' => __('The price per shift of the transport.', 'your-textdomain'),
      ],
	  'price1Km' => [
        'type' => 'Int',
        'description' => __('The price for 1 km of the transport.', 'your-textdomain'),
      ],
	  'carryingCapacity' => [
        'type' => 'Int',
        'description' => __('The carrying capacity of the transport.', 'your-textdomain'),
      ],
	  'bodyLength' => [
        'type' => 'Int',
        'description' => __('The body length of the transport.', 'your-textdomain'),
      ],
	  'bodyHeight' => [
        'type' => 'Int',
        'description' => __('The body height of the transport.', 'your-textdomain'),
      ],
	  'bodyWidth' => [
        'type' => 'Int',
        'description' => __('The body width of the transport.', 'your-textdomain'),
      ],
	  'bodyVolume' => [
        'type' => 'Int',
        'description' => __('The body volumeh of the transport.', 'your-textdomain'),
      ],
	  'photoTruck' => [
        'type' => ['list_of' => 'String'],
        'description' => __('The photo of the truck.', 'your-textdomain'),
      ],
	  'photoDriver' => [
        'type' => 'String',
        'description' => __('The photo of the driver.', 'your-textdomain'),
      ],
	  'fullDescription' => [
        'type' => 'String',
        'description' => __('The full description to of the transport.', 'your-textdomain'),
      ],
    ],
    'outputFields' => [
      'transport' => [
        'type' => 'Transport',
        'description' => __('The created transport.', 'your-textdomain'),
        'resolve' => function($transport, $args, $context, $info) {
          return $transport;
        },
      ],
    ],
    'mutateAndGetPayload' => function ($input, $context, $info) {
	  // Extract the input values
	  $title = $input['title'];
	  $description = $input['description'];
	  $category = $input['category'];
	  $imagesTruck = $input['photoTruck'];
	  $photoDriverUrl = $input['photoDriver'];

	  // Create the transport post
	  $transportId = wp_insert_post([
		'post_type' => 'transport',
		'post_title' => $title,
		'post_content' => $description,
		'post_status' => 'publish',
	  ]);
	  
	  // Set category for new transport
	  wp_set_object_terms( $transportId, $category, 'transport-categories' );
	  
	  // Array of ACF field names and their corresponding input field names
	  $acfFields = [
		'region-transport' => 'regionTransport',
		'city' => 'city',
		'custom-name' => 'customName',
		'custom-phone' => 'customPhone',
		'whatsapp' => 'whatsapp',
		'viber' => 'viber',
		'telegram' => 'telegram',
		'mode-operation' => 'modeOperation',
		'payment-method' => 'paymentMethod',
		'payment-procedure' => 'paymentProcedure',
		'vehicle-body-type' => 'vehicleBodyType',
		'type-transportation' => 'typeTransportation',
		'vehicle-brand' => 'vehicleBrand',
		'work-experience' => 'workExperience',
		'lease-term' => 'leaseTerm',
		'number-seats' => 'numberSeats',
		'number-seats-without-luggage' => 'numberSeatsWithoutLuggage',
		'service-specialization' => 'serviceSpecialization',
		'options' => 'options',
		'amenities' => 'amenities',
		'vehicle-class' => 'vehicleClass',
		'color' => 'color',
		'vehicles-in-park' => 'vehiclesInPark',
		'minimum-order-time' => 'minimumOrderTime',
		'price-1-hour' => 'price1Hour',
		'price-per-shift'=>'pricePerShift',
		'price-1-km'=>'price1Km',
		'carrying-capacity'=>'carryingCapacity',
		'body-length'=>'bodyLength',
		'body-height'=>'bodyHeight',
		'body-width'=>'bodyWidth',
		'body-volume'=>'bodyVolume',
		'full-description' => 'fullDescription',
	  ];

	  // Update the ACF fields
	  foreach ($acfFields as $acfField => $inputField) {
		if (!empty($input[$inputField])) {
		  update_field($acfField, $input[$inputField], $transportId);
		}
	  }
	  
	  if(!empty($photoDriverUrl)){  
		$attachmentId = attachment_url_to_postid($photoDriverUrl);
		if ($attachmentId) {
			update_field('photo-driver', $attachmentId, $transportId);
		}
	  }

	$imageIds = array();

	foreach ($imagesTruck as $imageUrl) {
		$attachmentId = attachment_url_to_postid($imageUrl);
		if ($attachmentId) {
			$imageIds[] = $attachmentId;
		}
	}

	if (!empty($imageIds)) {
		update_field('photo-truck', $imageIds, $transportId);
	}
	  
	  $payload = ['transportId' => $transportId];
	  foreach ($acfFields as $acfField => $inputField) {
		if (!empty($input[$inputField])) {
		  $payload[$acfField] = $input[$inputField];
		}
	  }
	  return $payload;
	},
  ]);
});

add_action('graphql_register_types', function() {
  register_graphql_mutation('UpdateTransportCustom', [
    'inputFields' => [
	  'transportId' => [
        'type' => 'ID',
        'description' => __('The ID of the cargo post to update.', 'your-textdomain'),
      ],
	  'category' => [
        'type' => 'String',
        'description' => __('The category of the transport.', 'your-textdomain'),
      ],
      'title' => [
        'type' => 'String',
        'description' => __('The title of the transport.', 'your-textdomain'),
      ],
      'description' => [
        'type' => 'String',
        'description' => __('The description of the transport.', 'your-textdomain'),
      ],
      'regionTransport' => [
        'type' => 'String',
        'description' => __('The shipping region of the transport.', 'your-textdomain'),
      ],
	  'city' => [
        'type' => 'String',
        'description' => __('The shipping city of the transport.', 'your-textdomain'),
      ],
	  'customName' => [
        'type' => 'String',
        'description' => __('The custom name of the transport.', 'your-textdomain'),
      ],
	  'customPhone' => [
        'type' => 'String',
        'description' => __('The custom phone date of the transport.', 'your-textdomain'),
      ],
	  'whatsapp' => [
        'type' => 'Boolean',
        'description' => __('The whatsapp of the transport.', 'your-textdomain'),
      ],
	  'viber' => [
        'type' => 'Boolean',
        'description' => __('The viber of the transport.', 'your-textdomain'),
      ],
	  'telegram' => [
        'type' => 'Boolean',
        'description' => __('The telegram of the transport.', 'your-textdomain'),
      ],
	  'modeOperation' => [
        'type' => 'String',
        'description' => __('The mode operation of the transport.', 'your-textdomain'),
      ],
	  'paymentMethod' => [
        'type' => 'String',
        'description' => __('The payment method of the transport.', 'your-textdomain'),
      ],
	  'paymentProcedure' => [
        'type' => 'String',
        'description' => __('The type budget to of the transport.', 'your-textdomain'),
      ],
	  'vehicleBodyType' => [
        'type' => 'String',
        'description' => __('The vehicle body type of the transport.', 'your-textdomain'),
      ],
	  'typeTransportation' => [
        'type' => 'String',
        'description' => __('The type transportation of the transport.', 'your-textdomain'),
      ],
	  'vehicleBrand' => [
        'type' => 'String',
        'description' => __('The brand of the transport.', 'your-textdomain'),
      ],
	  'workExperience' => [
        'type' => 'String',
        'description' => __('The work experience of the transport.', 'your-textdomain'),
      ],
	  'leaseTerm' => [
        'type' => 'String',
        'description' => __('The lease term of the transport.', 'your-textdomain'),
      ],
	  'numberSeats' => [
        'type' => 'String',
        'description' => __('The number seats of the transport.', 'your-textdomain'),
      ],
	  'numberSeatsWithoutLuggage' => [
        'type' => 'String',
        'description' => __('The number seats without luggage of the transport.', 'your-textdomain'),
      ],
	  'serviceSpecialization' => [
        'type' => 'String',
        'description' => __('The service specialization of the transport.', 'your-textdomain'),
      ],
	  'options' => [
        'type' => 'String',
        'description' => __('The options of the transport.', 'your-textdomain'),
      ],
	  'amenities' => [
        'type' => 'String',
        'description' => __('The amenities of the transport.', 'your-textdomain'),
      ],
	  'vehicleClass' => [
        'type' => 'String',
        'description' => __('The vehicle class of the transport.', 'your-textdomain'),
      ],
	  'color' => [
        'type' => 'String',
        'description' => __('The color of the transport.', 'your-textdomain'),
      ],
	  'vehiclesInPark' => [
        'type' => 'Int',
        'description' => __('The vehicles in park of the transport.', 'your-textdomain'),
      ],
	  'minimumOrderTime' => [
        'type' => 'Int',
        'description' => __('The minimum order time of the transport.', 'your-textdomain'),
      ],
	  'price1Hour' => [
        'type' => 'Int',
        'description' => __('The price for 1 hour of the transport.', 'your-textdomain'),
      ],
	  'pricePerShift' => [
        'type' => 'Int',
        'description' => __('The price per shift of the transport.', 'your-textdomain'),
      ],
	  'price1Km' => [
        'type' => 'Int',
        'description' => __('The price for 1 km of the transport.', 'your-textdomain'),
      ],
	  'carryingCapacity' => [
        'type' => 'Int',
        'description' => __('The carrying capacity of the transport.', 'your-textdomain'),
      ],
	  'bodyLength' => [
        'type' => 'Int',
        'description' => __('The body length of the transport.', 'your-textdomain'),
      ],
	  'bodyHeight' => [
        'type' => 'Int',
        'description' => __('The body height of the transport.', 'your-textdomain'),
      ],
	  'bodyWidth' => [
        'type' => 'Int',
        'description' => __('The body width of the transport.', 'your-textdomain'),
      ],
	  'bodyVolume' => [
        'type' => 'Int',
        'description' => __('The body volumeh of the transport.', 'your-textdomain'),
      ],
	  'photoTruck' => [
        'type' => ['list_of' => 'String'],
        'description' => __('The photo of the truck.', 'your-textdomain'),
      ],
	  'photoDriver' => [
        'type' => 'String',
        'description' => __('The photo of the driver.', 'your-textdomain'),
      ],
	  'fullDescription' => [
        'type' => 'String',
        'description' => __('The full description to of the transport.', 'your-textdomain'),
      ],
    ],
    'outputFields' => [
      'transport' => [
        'type' => 'Transport',
        'description' => __('The created transport.', 'your-textdomain'),
        'resolve' => function($transport, $args, $context, $info) {
          return $transport;
        },
      ],
    ],
    'mutateAndGetPayload' => function ($input, $context, $info) {
	  // Extract the input values
	  $transportId = $input['transportId'];
	  $title = $input['title'];
	  $description = $input['description'];
	  $category = $input['category'];
	  $imagesTruck = $input['photoTruck'];
	  $photoDriverUrl = $input['photoDriver'];
	  
	  wp_update_post([
        'ID' => $transportId,
		'post_title' => $title,
		'post_content' => $description,
		'post_status' => 'publish',
	  ]);
	  
		$existingTerms = wp_get_post_terms($transportId, 'transport-categories');

		// Получение ID выбранной категории по её слагу
		$newTermId = get_term_by('slug', $category, 'transport-categories')->term_id;

		// Поиск и удаление предыдущей категории из массива существующих терминов
		$termIdToDelete = null;
		foreach ($existingTerms as $term) {
			if ($term->term_id !== $newTermId) {
				$termIdToDelete = $term->term_id;
				break; // Найдена предыдущая категория, выходим из цикла
			}
		}

		if (!is_null($termIdToDelete)) {
			// Создание массива с ID существующих терминов
			$existingTermIds = wp_list_pluck($existingTerms, 'term_id');

			// Удаление предыдущей категории из массива с ID существующих терминов
			$updatedTermIds = array_diff($existingTermIds, array($termIdToDelete));

			// Добавление новой категории в массив с ID существующих терминов
			$updatedTermIds[] = $newTermId;

			// Установка новых терминов для записи
			wp_set_post_terms($transportId, $updatedTermIds, 'transport-categories');
		}
	  
	  // Array of ACF field names and their corresponding input field names
	  $acfFields = [
		'region-transport' => 'regionTransport',
		'city' => 'city',
		'custom-name' => 'customName',
		'custom-phone' => 'customPhone',
		'whatsapp' => 'whatsapp',
		'viber' => 'viber',
		'telegram' => 'telegram',
		'mode-operation' => 'modeOperation',
		'payment-method' => 'paymentMethod',
		'payment-procedure' => 'paymentProcedure',
		'vehicle-body-type' => 'vehicleBodyType',
		'type-transportation' => 'typeTransportation',
		'vehicle-brand' => 'vehicleBrand',
		'work-experience' => 'workExperience',
		'lease-term' => 'leaseTerm',
		'number-seats' => 'numberSeats',
		'number-seats-without-luggage' => 'numberSeatsWithoutLuggage',
		'service-specialization' => 'serviceSpecialization',
		'options' => 'options',
		'amenities' => 'amenities',
		'vehicle-class' => 'vehicleClass',
		'color' => 'color',
		'vehicles-in-park' => 'vehiclesInPark',
		'minimum-order-time' => 'minimumOrderTime',
		'price-1-hour' => 'price1Hour',
		'price-per-shift'=>'pricePerShift',
		'price-1-km'=>'price1Km',
		'carrying-capacity'=>'carryingCapacity',
		'body-length'=>'bodyLength',
		'body-height'=>'bodyHeight',
		'body-width'=>'bodyWidth',
		'body-volume'=>'bodyVolume',
		'full-description' => 'fullDescription',
	  ];

	  // Update the ACF fields
	  foreach ($acfFields as $acfField => $inputField) {
		update_field($acfField, $input[$inputField], $transportId);
	  }
	  
	  if(!empty($photoDriverUrl)){  
		$attachmentId = attachment_url_to_postid($photoDriverUrl);
		if ($attachmentId) {
			update_field('photo-driver', $attachmentId, $transportId);
		}
	  } else {
		  update_field('photo-driver', null, $transportId);
	  }

	$imageIds = array();

	foreach ($imagesTruck as $imageUrl) {
		$attachmentId = attachment_url_to_postid($imageUrl);
		if ($attachmentId) {
			$imageIds[] = $attachmentId;
		}
	}

	if (!empty($imageIds)) {
		update_field('photo-truck', $imageIds, $transportId);
	} else {
		update_field('photo-truck', null, $transportId);
	  }
	  
	  $payload = ['transportId' => $transportId];
	  foreach ($acfFields as $acfField => $inputField) {
		$payload[$acfField] = $input[$inputField];
	  }
	  return $payload;
	},
  ]);
});

add_action('graphql_register_types', function() {
  register_graphql_mutation('UpdateUserCustom', [
    'inputFields' => [
      'userId' => [
        'type' => 'ID',
        'description' => __('The ID of the user.', 'your-textdomain'),
      ],
      'firstName' => [
        'type' => 'String',
        'description' => __('The first name of the user.', 'your-textdomain'),
      ],
      'email' => [
        'type' => 'String',
        'description' => __('The email of the user.', 'your-textdomain'),
      ],
      'phone' => [
        'type' => 'String',
        'description' => __('The phone number of the user.', 'your-textdomain'),
      ],
    ],
    'outputFields' => [
      'user' => [
        'type' => 'User',
        'description' => __('The updated user.', 'your-textdomain'),
        'resolve' => function($user, $args, $context, $info) {
          return $user;
        },
      ],
    ],
    'mutateAndGetPayload' => function ($input, $context, $info) {
      // Extract the input values
      $userId = $input['userId'];
      $firstName = $input['firstName'];
      $email = $input['email'];
      $phone = $input['phone'];

      // Update the user
      wp_update_user([
        'ID' => $userId,
        'first_name' => $firstName,
        'user_email' => $email,
      ]);
	  
	  // Update the user's phone number using ACF update_field() function
	  update_field('phone', $phone, 'user_' . $userId);

      // Get the updated user object
      $user = get_user_by('ID', $userId);

      return ['user' => $user];
    },
  ]);
});

/**
 * Обновление поля "transport-in-park" у пользователя при создании или редактировании транспортных постов.
 * @param int $post_id - ID поста, который был сохранен.
 */
function update_transport_in_park_on_post_save($post_id) {
    // Получаем тип поста.
    $post_type = get_post_type($post_id);

    // Проверяем, что это транспортный пост.
    if ($post_type === 'transport') {
        // Получаем ID автора поста.
        $user_id = get_post_field('post_author', $post_id);

        // Получаем количество транспортных постов автора.
        $args = array(
            'post_type' => 'transport',
            'post_status' => 'publish',
            'author' => $user_id,
            'posts_per_page' => -1,
        );

        $query = new WP_Query($args);
        $count = $query->found_posts;

        // Обновляем поле "transport-in-park" в метаданных пользователя.
        update_field('transport-in-park', $count, 'user_' . $user_id);
    }
}
add_action('save_post', 'update_transport_in_park_on_post_save');

function update_views_count($postId) {
  $current_count = get_field('views', $postId);
  $new_count = $current_count ? intval($current_count) + 1 : 1;
  update_field('views', $new_count, $postId);
  return $new_count;
}


add_action('graphql_register_types', function() {
  register_graphql_mutation('UpdateViewsCount', [
    'inputFields' => [
      'postId' => [
        'type' => 'ID',
        'description' => __('The ID of the post to update views count.', 'your-textdomain'),
      ],
    ],
    'outputFields' => [
      'views' => [
        'type' => 'Int',
        'description' => __('The updated views count.', 'your-textdomain'),
        'resolve' => function ($payload) {
          return $payload;
        },
      ],
    ],
    'mutateAndGetPayload' => function ($input, $context, $info) {
      $postId = $input['postId'];
      $views_count = update_views_count($postId);
      return ['views' => $views_count];
    },
  ]);
});

// Hide setting field "views"
add_filter('acf/load_field', function ($field) {
  if ($field['name'] === 'views') {
    $field['readonly'] = true;
    $field['disabled'] = true;
  }
  return $field;
});

add_filter( 'graphql_post_object_connection_query_args', function( $args ) {
	$args['no_found_rows'] = false;
	return $args;
} );

add_filter( 'graphql_connection_page_info', function( $page_info, $connection ) {
	$page_info['total'] = null;
	if ( $connection->get_query() instanceof \WP_Query ) {
		if ( isset( $connection->get_query()->found_posts ) ) {
			$page_info['total'] = (int) $connection->get_query()->found_posts;
		}
	}
	return $page_info;
}, 10, 2 );

add_action( 'graphql_register_types', function() {

	register_graphql_field( 'WPPageInfo', 'total', [
			'type' => 'Int',
	] );

});


add_action('graphql_register_types', function () {
    register_graphql_field('RootQueryToTransportConnectionWhereArgs', 'regionTransport', [
        'type' => 'String',
        'description' => __('Filter transport items by the region-transport ACF field.', 'your-textdomain'),
    ]);
	register_graphql_field('RootQueryToTransportConnectionWhereArgs', 'city', [
        'type' => 'String',
        'description' => __('Filter transport items by the region-transport ACF field.', 'your-textdomain'),
    ]);
	register_graphql_field('RootQueryToTransportConnectionWhereArgs', 'categoryTransport', [
        'type' => 'String',
        'description' => __('Filter transport items by the region-transport ACF field.', 'your-textdomain'),
    ]);
});


add_filter('graphql_post_object_connection_query_args', function ($query_args, $source, $args, $context, $info) {
    if (isset($args['where']['regionTransport'])) {
        $query_args['meta_query'][] = [
            'key' => 'region-transport',
            'value' => $args['where']['regionTransport'],
            'compare' => '='
        ];
    }
	
	if (isset($args['where']['city'])) {
        $query_args['meta_query'][] = [
            'key' => 'city',
            'value' => $args['where']['city'],
            'compare' => '='
        ];
    }

    if (isset($args['where']['categoryTransport'])) {
        $category_slug = $args['where']['categoryTransport'];
        $category = get_term_by('slug', $category_slug, 'transport-categories');
        if ($category) {
            $query_args['tax_query'][] = [
                'taxonomy' => 'transport-categories',
                'field' => 'slug',
                'terms' => $category_slug,
            ];
        }
    }

    return $query_args;
}, 10, 5);

add_action('graphql_register_types', function () {
    register_graphql_field('RootQuery', 'regionsTransport', [
        'type' => ['list_of' => 'String'],
        'description' => __('List of regions with more than 1 car.', 'your-textdomain'),
        'args' => [
            'categoryTransport' => [
                'type' => 'String',
                'description' => __('Filter by transport category.', 'your-textdomain'),
            ],
        ],
        'resolve' => function ($root, $args) {
            $category_slug = $args['categoryTransport'];

            $args = [
                'post_type' => 'transport',
                'posts_per_page' => -1,
                'post_status' => 'publish',
            ];

            // Если указана категория, добавляем её в запрос
            if (!empty($category_slug)) {
                $args['tax_query'][] = [
                    'taxonomy' => 'transport-categories',
                    'field' => 'slug',
                    'terms' => $category_slug,
                ];
            }

            $query = new WP_Query($args);

            if ($query->have_posts()) {
                $regions = [];
                while ($query->have_posts()) {
                    $query->the_post();
                    $region = get_field('region-transport');

                    if ($region && !in_array($region, $regions)) {
                        $regions[] = $region;
                    }
                }

                return $regions;
            }

            return [];
        },
    ]);
});

add_action('graphql_register_types', function () {
    register_graphql_field('RootQuery', 'citiesTransport', [
        'type' => ['list_of' => 'String'],
        'description' => __('List of regions with more than 1 car.', 'your-textdomain'),
        'args' => [
		 'categoryTransport' => [
                'type' => 'String',
                'description' => __('Filter by transport category.', 'your-textdomain'),
            ],
            'regionTransport' => [
                'type' => 'String',
                'description' => __('Filter by transport category.', 'your-textdomain'),
            ],
        ],
        'resolve' => function ($root, $args) {
            $category_slug = $args['categoryTransport'];
            $region = $args['regionTransport'];

            $args = [
                'post_type' => 'transport',
                'posts_per_page' => -1,
                'post_status' => 'publish',
            ];
			
			// Если указана категория, добавляем её в запрос
            if (!empty($category_slug)) {
                $args['tax_query'][] = [
                    'taxonomy' => 'transport-categories',
                    'field' => 'slug',
                    'terms' => $category_slug,
                ];
            }

            // Если указан регион, добавляем его в запрос
            if (!empty($region)) {
                 $args['meta_query'][] = [
					'key' => 'region-transport',
					'value' => $region,
					'compare' => '='
				];
            }

            $query = new WP_Query($args);

            if ($query->have_posts()) {
                $cities = [];
                while ($query->have_posts()) {
                    $query->the_post();
                    $city = get_field('city');

                    if ($city && !in_array($city, $cities)) {
                        $cities[] = $city;
                    }
                }

                return $cities;
            }

            return [];
        },
    ]);
});

add_action( 'graphql_register_types', 'register_cargo_order' );
function register_cargo_order() {
    register_graphql_enum_type( 'Order', [
      'description' => __( "Man's best friend", 'your-textdomain' ),
      'values' => [
        'PRICE_DESC' => [
          'value' => 'priceDesc'
        ],
        'PRICE_ASC' => [
          'value' => 'priceAsc'
        ],
        'DATE_DESC' => [
          'value' => 'dateDesc'
        ],
        'DATE_ASC' => [
          'value' => 'dateAsc'
        ],
      ],
    ] );
}

add_action('graphql_register_types', function () {
    register_graphql_field('RootQueryToCargoConnectionWhereArgs', 'shippingRegion', [
        'type' => 'String',
        'description' => __('Filter Cargo items by the shipping city ACF field.', 'your-textdomain'),
    ]);
	register_graphql_field('RootQueryToCargoConnectionWhereArgs', 'shippingCity', [
        'type' => 'String',
        'description' => __('Filter Cargo items by the shipping city ACF field.', 'your-textdomain'),
    ]);
	register_graphql_field('RootQueryToCargoConnectionWhereArgs', 'unloadingCountry', [
        'type' => 'String',
        'description' => __('Filter cargo items by the unloading country ACF field.', 'your-textdomain'),
    ]);
	register_graphql_field('RootQueryToCargoConnectionWhereArgs', 'unloadingRegion', [
        'type' => 'String',
        'description' => __('Filter cargo items by the unloading city ACF field.', 'your-textdomain'),
    ]);
	register_graphql_field('RootQueryToCargoConnectionWhereArgs', 'unloadingCity', [
        'type' => 'String',
        'description' => __('Filter cargo items by the unloading city ACF field.', 'your-textdomain'),
    ]);
	register_graphql_field('RootQueryToCargoConnectionWhereArgs', 'weight', [
        'type' => 'Int',
        'description' => __('Filter cargo items by the weight ACF field.', 'your-textdomain'),
    ]);
	register_graphql_field('RootQueryToCargoConnectionWhereArgs', 'vehicleBodyType', [
        'type' => 'String',
        'description' => __('Filter cargo items by the vehicle cody type ACF field.', 'your-textdomain'),
    ]);
	register_graphql_field('RootQueryToCargoConnectionWhereArgs', 'customOrder', [
		'type' => 'Order',
        'description' => __('Filter cargo items by the date desc ACF field.', 'your-textdomain'),
    ]);
});

add_filter('graphql_post_object_connection_query_args', function ($query_args, $source, $args, $context, $info) {
    if (isset($args['where']['shippingRegion'])) {
        $query_args['meta_query'][] = [
            'key' => 'shipping-region',
            'value' => $args['where']['shippingRegion'],
            'compare' => '='
        ];
    }
	
	if (isset($args['where']['shippingCity'])) {
        $query_args['meta_query'][] = [
            'key' => 'shipping-city',
            'value' => $args['where']['shippingCity'],
            'compare' => '='
        ];
    }
	
	if (isset($args['where']['unloadingCountry'])) {
        $query_args['meta_query'][] = [
            'key' => 'unloading-country',
            'value' => $args['where']['unloadingCountry'],
            'compare' => '='
        ];
    }
	
	if (isset($args['where']['unloadingRegion'])) {
        $query_args['meta_query'][] = [
            'key' => 'unloading-region',
            'value' => $args['where']['unloadingRegion'],
            'compare' => '='
        ];
    }
	
	if (isset($args['where']['unloadingCity'])) {
        $query_args['meta_query'][] = [
            'key' => 'unloading-city',
            'value' => $args['where']['unloadingCity'],
            'compare' => '='
        ];
    }
	
	if (isset($args['where']['weight'])) {
		$query_args['meta_query'][] = [
			'key' => 'weight',
			'value' => (int) $args['where']['weight'],
			'type' => 'NUMERIC',
			'compare' => '<='
		];
	}
	
	if (isset($args['where']['vehicleBodyType'])) {
        $query_args['meta_query'][] = [
            'key' => 'vehicle-body-type',
            'value' => $args['where']['vehicleBodyType'],
            'compare' => '='
        ];
    }

	if (isset($args['where']['customOrder'])) {
        $customOrder = $args['where']['customOrder'];
		
		switch ($customOrder) {
            case 'priceDesc':
                $query_args['orderby'] = 'meta_value_num';
                $query_args['meta_key'] = 'budget-to';
                $query_args['order'] = 'DESC';
                break;
            case 'priceAsc':
                $query_args['orderby'] = 'meta_value_num';
                $query_args['meta_key'] = 'budget-to';
                $query_args['order'] = 'ASC';
                break;
            case 'dateDesc':
                $query_args['orderby'] = 'date';
                $query_args['order'] = 'DESC';
                break;
            case 'dateAsc':
                $query_args['orderby'] = 'date';
                $query_args['order'] = 'ASC';
                break;
        }
    }
	
    return $query_args;
}, 10, 5);

function get_filter_options_cargo($field_names) {
    $options = array();
    
	foreach ($field_names as $field_name) {
        $args = array(
            'post_type' => 'cargo',
            'posts_per_page' => -1,
            'fields' => 'ids',
            'meta_key' => $field_name,
        );

        $query = new WP_Query($args);

        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                $value = get_field($field_name);

                if (!empty($value) && !in_array($value, $options)) {
                    $options[] = $value;
                }
            }
        }

        wp_reset_postdata();
    }

    return $options;
}

add_action('graphql_register_types', function () {
    register_graphql_field('RootQuery', 'cargoFilter', [
        'type' => ['list_of' => 'String'],
        'description' => __('List of regions with more than 1 car.', 'your-textdomain'),
        'resolve' => function ($root, $args) {
			$options = get_filter_options_cargo(['unloading-country', 'unloading-city']);
			
            return $options;
        },
    ]);
});