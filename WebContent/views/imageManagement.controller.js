/**
 * Created by surajnagaraj on 10/27/16.
 */
(function () {
    angular
        .module("PsychWebApp")
        .controller("ImageManagementController", ImageManagementController);
    

    function ImageManagementController(ImageManagementService, FieldLookupService,$scope, $http, $window, serverURL) {
    	var vm = this;
    	vm.tab = 'imageCatergories';
    	vm.subTab = 'searchImageCatergories';
    	
    	vm.createIc = {
    			imageCategoryName : '',
    			imageCategoryDescription : ''
    	};
    	
    	vm.searchIc = {
    			imageCategoryName : '',
    			imageCategoryDescription : ''
    	};
    	
    	vm.createI = {
    			imageName : '',
    			imageDescription : '',
    			imageIntensity : '',
    			imageType : '',
    			imageCategory : '',
    	};
    	
    	vm.searchI = {
    			imageName : '',
    			imageDescription : '',
    			imageIntensity : '',
    			imageTypeId : '',
    			imageCategoryId : '',
    	};
    	
    	ImageManagementService
    	.getAllCategories()
    	.success(function(response) {
    		if(response.status === '200')
    			vm.imageCategoryList = response.results;
    	});
    	
    	
    	
    	FieldLookupService
    	.fetchFields('imageType')
    	.success(function(response) {
    		if(response.status === '200')
    			vm.imageTypeList = response.results;
    	});
    	
    	vm.setTab = function (tabId) {
            //console.log("Setting tab to " + tabId);
            vm.tab = tabId;
        };
        
        vm.setSubTab = function (tabId) {
        	vm.subTab = tabId;
        }

        vm.isSet = function (tabId) {
            //console.log("Tab set to " + tabId);
        	
            return vm.tab === tabId;
        };
        
        vm.isSetSubTab = function (tabId) {
        	return vm.subTab === tabId;
        };
        
        
        
        vm.createImageCategory = createImageCategory;
        
        function createImageCategory(Ic) {
        	var imageCategory = {
        			imageCategoryName : Ic.imageCategoryName,
        			imageCategoryDescription : Ic.imageCategoryDescription
        	};
        	
        	console.log(imageCategory);
        	
        	ImageManagementService
        		.createImageCategory(imageCategory)
        		.success(function(response) {
        			if(response.status === '200') {
        				vm.createIc = {
        						imageCategoryName : '',
        		    			imageCategoryDescription : ''
        		    	};
        				
        				$window.alert('Image Category has been created successfully');
        			}
        			
        			else
        				$window.alert('Image Category creation failed');
        		});
        }
        
        vm.searchImageCategory = searchImageCategory;
        
        function searchImageCategory(searchIc) {
        	var imageCategoriesList = [];
        	
        	ImageManagementService
        		.getAllCategories()
        		.success(function(response) {
        			imageCategoriesList = response.results;
        		
                	var imageCategoryParams = {
                			imageCategoryName : searchIc.imageCategoryName,
                			imageCategoryDescription : searchIc.imageCategoryDescription
                				
                	};
                	vm.imageCategorySearchResults = JSONSearch(imageCategoryParams, imageCategoriesList);
                	vm.isSearchClicked = true;
        		})
        }
        
        vm.selectImageCategory = selectImageCategory;
        var updateImageCategoryId = '';
        var selectedImageCategory = '';
        function selectImageCategory(index) {
        	var Ic = vm.imageCategorySearchResults[index];
        	selectedImageCategory = index;
        	console.log(Ic);
        	vm.updateIc = {
        			imageCategoryName : Ic.imageCategoryName,
        			imageCategoryDescription : Ic.imageCategoryDescription,
        			
        	};
        	updateImageCategoryId = vm.imageCategorySearchResults[index].imageCategoryId;
        }
        
        vm.updateImageCategory = updateImageCategory;
        
        function updateImageCategory(Ic) {
        	
        	var IcUpdateParams = {
        			imageCategoryName : Ic.imageCategoryName,
        			imageCategoryDescription : Ic.imageCategoryDescription,
        			imageCategoryId : updateImageCategoryId.toString()
        	};
        	//console.log(locationUpdateParams);
        	//console.log(qcUpdateParams);
        	ImageManagementService
    			.updateImageCategory(IcUpdateParams)
    			.success(function(response) {
    				console.log(response);
    				if(response.status =='200') {
    					vm.isUpdateSuccessful = true;
    					$window.alert('Image Category has been updated successfully');
    					vm.imageCategorySearchResults[selectedImageCategory] = IcUpdateParams;
    				}
    				
    				else {
    					$window.alert('Image Category update failed');
    				}
    				
    			});
        }
        
        	
        	$scope.files = [];

            //listen for the file selected event
            $scope.$on("fileSelected", function (event, args) {
                $scope.$apply(function () {            
                    //add the file object to the scope's files collection
                	$scope.files.push(args.file);
                	console.log($scope.files[0].name);
                });
            });
           
            
            //the save method
            vm.save = function() {
            	/*var imageProp = {
                		imageName : $scope.imageName,
                		imageDescription : $scope.imageDescription,
                		imageType : $scope.imageType.toString(),
                		imageIntensity : $scope.imageIntensity.toString(),
                		imageCategory : $scope.imageCategory.toString()
                	};*/
            	//console.log(imageProp);
            	console.log("Inside save function");
            	console.log(angular.toJson('filename 123'));
            	console.log(angular.toJson({'name' : 'filename'}));
            	/*var formData = new FormData();
                
                formData.append('model', 'hfhefhoewoew');
                
                
                formData.append('files', $scope.files[0]);*/
                $http({
                	withCredentials : true,
                    method: 'POST',
                    url: serverURL.url + "imageUpload",
                   
                    headers: { 'Content-Type': undefined },
                   
                    
                    
                    transformRequest: function (data) {
                        var formData = new FormData();
                        
                        formData.append('imageName', $scope.imageName);
                        formData.append('imageDescription', $scope.imageDescription);
                        formData.append('imageTypeId', $scope.imageTypeId);
                        formData.append('imageIntensity', $scope.imageIntensity);
                        formData.append('imageCategoryId', $scope.imageCategoryId);
                        formData.append('imageFile', $scope.files[0]);
                        
                        
                        //formData.append('files', data.files[0]);
                       
                        return formData;
                    }
                   
                    
                }).
                success(function (data, status, headers, config) {
                	$window.alert('Image has been created successfully');
                	$scope.files = [];
                }).
                error(function (data, status, headers, config) {
                	$window.alert('Image creation failed');
                	$scope.files = [];
                });
                };
                
                vm.searchImages = searchImages;
                
                
                function searchImages(searchI) {
                	console.log(searchI);
                	var imageList = [];
                	console.log("Inside search images");
                	
                	ImageManagementService
                	.getAllImages()
                	.success(function(response) {
                		if(response.status === '200')
                			imageList = response.results;
                		
                			for(var img in imageList) {
                				//console.log(img);
                				//console.log(serverURL);
                				imageList[img].imagePath = serverURL.url + 'imageUpload?imagePath=' + imageList[img].imagePath;
                				imageList[img].imageIntensity = imageList[img].imageIntensity.toString();
                				imageList[img].imageCategoryId = imageList[img].imageCategoryId.toString();
                				imageList[img].imageTypeId = imageList[img].imageTypeId.toString();
                			}
                			console.log(imageList);
                	
                        	var imageParams = {
                        			imageName : searchI.imageName,
                        			imageDescription : searchI.imageDescription,
                        			imageIntensity : searchI.imageIntensity.toString(),
                        			imageTypeId : searchI.imageTypeId.toString(),
                        			imageCategoryId : searchI.imageCategoryId.toString(),
                        				
                        	};
                        	console.log(imageParams);
                        	vm.imageSearchResults = JSONSearch(imageParams, imageList);
                        	vm.isSearchImagesClicked = true;
                		});
                }
                
                vm.selectImageCategoryDetails = selectImageCategoryDetails;
                
                function selectImageCategoryDetails(Ic) {
                	var imageCategory = vm.imageCategorySearchResults[Ic];
                	//console.log(questionCategory);
                	vm.selectedIc = imageCategory;
                }
                
                vm.selectImage = selectImage;
                var updateImageId = '';
                var selectedImage = '';
                function selectImage(index) {
                	var I = vm.imageSearchResults[index];
                	selectedImage = index;
                	//console.log(Ic);
                	vm.updateI = {
                			imageName : I.imageName,
                			imageDescription : I.imageDescription,
                			imageIntensity : I.imageIntensity.toString(),
                			imageTypeId : I.imageTypeId,
                			imageCategoryId : I.imageCategoryId,
                			imagePath : I.imagePath
                			
                	};
                	console.log(vm.updateI);
                	updateImageId = vm.imageSearchResults[index].imageId;
                }
                
                vm.updateImage = updateImage;
                var listOfImages = [];
                function updateImage(Img) {
                	
                	ImageManagementService
                	.getAllImages()
                	.success(function(response) {
                		if(response.status === '200'){
                		listOfImages = response.results;
                		console.log(response.results);
                		}
                	
                	console.log(listOfImages);
                	var ImUpdateParams = {
                			imageName : Img.imageName,
                			imageDescription : Img.imageDescription,
                			imageIntensity : Img.imageIntensity.toString(),
                			imageTypeId : Img.imageTypeId.toString(),
                			imageCategoryId : Img.imageCategoryId.toString(),
                			imagePath : listOfImages[selectedImage].imagePath,
                			imageId : updateImageId
                	};
                	console.log(ImUpdateParams);
                	//console.log(qcUpdateParams);
                	console.log($scope.files.length);
                	vm.save = function() {
                    	/*var imageProp = {
                        		imageName : $scope.imageName,
                        		imageDescription : $scope.imageDescription,
                        		imageType : $scope.imageType.toString(),
                        		imageIntensity : $scope.imageIntensity.toString(),
                        		imageCategory : $scope.imageCategory.toString()
                        	};*/
                    	//console.log(imageProp);
                    	
                    	/*var formData = new FormData();
                        
                        formData.append('model', 'hfhefhoewoew');
                        
                        
                        formData.append('files', $scope.files[0]);*/
                		
                        $http({
                        	withCredentials : true,
                            method: 'PUT',
                            url: serverURL.url + "imageUpload",
                           
                            headers: { 'Content-Type': undefined },
                           
                            
                            
                            transformRequest: function (data) {
                                var formData = new FormData();
                                
                                if($scope.files.length > 0) {
                                	formData.append('imageFile', $scope.files[0]);
                                }
                                
                                formData.append('imageName', ImUpdateParams.imageName);
                                formData.append('imageDescription', ImUpdateParams.imageDescription);
                                formData.append('imageTypeId', ImUpdateParams.imageTypeId);
                                formData.append('imageIntensity', ImUpdateParams.imageIntensity);
                                formData.append('imageCategoryId', ImUpdateParams.imageCategoryId);
                                formData.append('imagePath', ImUpdateParams.imagePath);
                                formData.append('imageId', updateImageId.toString());
                                
                                
                                
                                //formData.append('files', data.files[0]);
                               
                                return formData;
                            }
                           
                            
                        }).
                        success(function (data, status, headers, config, response) {
                        	
                        	$scope.files = [];
                        	ImageManagementService
                        	.getAllImages()
                        	.success(function(response) {
                        		if(response.status === '200'){
                        		vm.imageSearchResults[selectedImage] = response.results[selectedImage];
                        		vm.imageSearchResults[selectedImage].imagePath = serverURL.url + 'imageUpload?imagePath=' + vm.imageSearchResults[selectedImage].imagePath;
                        		vm.updateI.imagePath = vm.imageSearchResults[selectedImage].imagePath;
                        		}
                        	});
                        	//if(response.status =='200') {
            					//vm.isUpdateSuccessful = true;
            					$window.alert('Image details have been updated successfully');
            					//vm.imageSearchResults[selectedImage] = ImUpdateParams;
            					
            					//hvm.imageSearchResults[selectedImage].imagePath = serverURL.url + 'imageUpload?imagePath=' +ImUpdateParams.imagePath;
            				//}
            				
            				//else {
            					//$window.alert('Image Details update failed');
            				//}
                        }).
                        error(function (data, status, headers, config) {
                        	$window.alert('Image creation failed');
                        	$scope.files = [];
                        });
                        };
                        
                        vm.save();
                	});
               
                }
                
                
    }
            
           
        	
        	
        
    
})();