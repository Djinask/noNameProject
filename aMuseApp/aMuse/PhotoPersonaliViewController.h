//
//  PhotoPersonaliViewController.h
//  aMuse
//
//  Created by simone on 10/05/13.
//  Copyright (c) 2013 simone. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "UploadPhotoViewController.h"



@interface PhotoPersonaliViewController : UIViewController <UIActionSheetDelegate, UINavigationControllerDelegate, UIImagePickerControllerDelegate, UploadPhotoDelegate, UIWebViewDelegate>

@property (strong, nonatomic) IBOutlet UIWebView *photopersonaliView;


- (IBAction)reload;
@end
