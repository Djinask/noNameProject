//
//  AggiungiViewController.h
//  aMuse
//
//  Created by simone on 09/05/13.
//  Copyright (c) 2013 simone. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "LoginViewController.h"
#import "ASIHTTPRequest.h"
#import "PhotoPersonaliViewController.h"



@interface FirstViewController : UIViewController <ASIHTTPRequestDelegate>
@property (weak, nonatomic) IBOutlet UIImageView *slideShow;

- (IBAction)shareStuff;

@end
