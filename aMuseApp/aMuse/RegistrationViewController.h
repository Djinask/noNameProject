//
//  RegistrationViewController.h
//  aMuse
//
//  Created by simone on 13/05/13.
//  Copyright (c) 2013 simone. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ZBarSDK.h"
#import "ASIFormDataRequest.h"
@interface RegistrationViewController : UIViewController <ZBarReaderDelegate, ASIHTTPRequestDelegate, UITextFieldDelegate>

@property (strong, nonatomic) IBOutlet UILabel *risultatoCorretto;
@property (strong, nonatomic) IBOutlet UITextField *emailTextField;
@property (strong, nonatomic) IBOutlet UITextView *messaggio;
@property (strong, nonatomic) IBOutlet UIButton *bottoneQR;
@property (strong, nonatomic) IBOutlet UIBarButtonItem *cancelButton;

- (IBAction)scanQRCode;
- (IBAction)goHome;
@end
