//
//  UploadPhotoViewController.h
//  aMuse
//
//  Created by simone on 10/05/13.
//  Copyright (c) 2013 simone. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ASIFormDataRequest.h"


@protocol UploadPhotoDelegate <NSObject>

- (void)didFinishUploadingPhoto;
@end

@interface UploadPhotoViewController : UIViewController <UITextFieldDelegate, ASIHTTPRequestDelegate>


@property (strong, nonatomic) IBOutlet UITextField *titleTextField;
@property (strong, nonatomic) IBOutlet UITextField *descriptionTextField;
@property (strong, nonatomic) IBOutlet UIImageView *photoImage;
@property (strong, nonatomic) UIImage *photo;
@property (strong, nonatomic) IBOutlet UIBarButtonItem *cancelButton;
@property (strong, nonatomic) IBOutlet UIBarButtonItem *uploadButton;
@property (strong, nonatomic) id<UploadPhotoDelegate> delegate;

- (IBAction)tornaIndietro;
- (IBAction)uploadSelectedPhoto;

@end
